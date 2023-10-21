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
	private readonly AccessSecret: string = this.config.getOrThrow('JWT_ACCESS_SECRET')
	private readonly AccessExpires: string = this.config.getOrThrow('JWT_ACCESS_EXPIRES')

	private readonly RefreshSecret: string = this.config.getOrThrow('JWT_REFRESH_SECRET')
	private readonly RefreshExpires: string =
		this.config.getOrThrow('JWT_REFRESH_EXPIRES')

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

		const accessToken: string = this.jwt.sign(
			{ userId },
			{ secret: this.AccessSecret, expiresIn: this.AccessExpires }
		)

		const refreshToken: string = this.jwt.sign(
			{ userId, sessionId },
			{ secret: this.RefreshSecret, expiresIn: this.RefreshExpires }
		)

		return { accessToken, refreshToken }
	}
}
