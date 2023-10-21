import { JwtService } from '@nestjs/jwt'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { LoginCommand } from './login.command'
import { SessionsRepo } from '@sessions/sessions.repo'
import { ConfigService } from '@nestjs/config'

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

		const accessSecret: string = this.config.getOrThrow<string>('JWT_ACCESS_SECRET')
		const accessExpires: number = this.config.getOrThrow<number>('JWT_ACCESS_EXPIRES')

		const refreshSecret: string = this.config.getOrThrow<string>('JWT_REFRESH_SECRET')
		const refreshExpires: number =
			this.config.getOrThrow<number>('JWT_REFRESH_EXPIRES')

		const accessToken: string = this.jwt.sign(
			{ userId },
			{ secret: accessSecret, expiresIn: +accessExpires }
		)

		const refreshToken: string = this.jwt.sign(
			{ userId, sessionId },
			{ secret: refreshSecret, expiresIn: +refreshExpires }
		)

		return { accessToken, refreshToken }
	}
}
