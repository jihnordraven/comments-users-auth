import { JwtService } from '@nestjs/jwt'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { LoginCommand } from './login.command'
import { SessionsRepo } from '../../../sessions/repositories/sessions.repo'
import { ConfigService } from '@nestjs/config'
import { CONFIG } from '../../../../config'

export interface ITokens {
	accessToken: string
	refreshToken: string
}

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
	constructor(
		protected readonly config: ConfigService,
		protected readonly sessionsRepo: SessionsRepo,
		protected readonly jwt: JwtService
	) {}

	public async execute({ input }: LoginCommand): Promise<any> {
		const { userId, userIp, userAgent } = input

		const sessionId: string = await this.sessionsRepo.create({
			userId,
			userIp,
			userAgent
		})

		const accessExpires: number = this.config.getOrThrow<number>('JWT_ACCESS_EXPIRES')
		const refreshExpires: number =
			this.config.getOrThrow<number>('JWT_REFRESH_EXPIRES')

		const accessToken: string =
			'Bearer ' +
			this.jwt.sign(
				{ userId },
				{ secret: CONFIG.JWT_ACCESS_SECRET, expiresIn: +accessExpires }
			)

		const refreshToken: string =
			'Bearer ' +
			this.jwt.sign(
				{ userId, sessionId },
				{ secret: CONFIG.JWT_REFRESH_SECRET, expiresIn: +refreshExpires }
			)

		return { accessToken, refreshToken }
	}
}
