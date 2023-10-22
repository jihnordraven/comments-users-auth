import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Ip,
	Post,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { CurrentUser, Public, UserAgent } from '@decorators'
import { CommandBus } from '@nestjs/cqrs'
import { AC } from './commands'
import { RegisterDto } from './core/dtos'
import { Request, Response } from 'express'
import { User } from '@prisma/client'
import { ITokens } from './commands/login/login.handler'
import { REFRESH_TOKEN } from '@constants'
import { GUARDS } from '@guards'
import { JwtRefreshPayload } from '../../guards-handlers/strategies/jwt-refresh.strategy'
import { JwtAccessGuard } from 'src/guards-handlers/guards/jwt-access.guard'
import { UserResponse } from '@users/core/responses'

@Controller('auth')
export class AuthController {
	constructor(private readonly commandBus: CommandBus) {}

	@Public()
	@Post('signUp')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async signUp(@Body() dto: RegisterDto): Promise<void> {
		await this.commandBus.execute(new AC.RegisterCommand(dto))
	}

	@Public()
	@Post('signIn')
	@HttpCode(HttpStatus.OK)
	@UseGuards(GUARDS.LocalGuard)
	public async signIn(
		@Req() req: Request,
		@Res() res: Response,
		@Ip() userIp: string,
		@UserAgent() userAgent: string
	): Promise<void> {
		const user: User = req.user as User

		const tokens: ITokens = await this.commandBus.execute(
			new AC.LoginCommand({ userId: user.id, userIp, userAgent })
		)
		this.setTokensToResponse(tokens, res)
	}

	@Public()
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	@UseGuards(GUARDS.JwtRefreshGuard)
	public async refresh(
		@Req() req: Request,
		@Res() res: Response,
		@Ip() userIp: string,
		@UserAgent() userAgent: string
	): Promise<void> {
		const payload: JwtRefreshPayload = req.user as JwtRefreshPayload

		await this.commandBus.execute(new AC.LogoutCommand(payload))

		const tokens: ITokens = await this.commandBus.execute(
			new AC.LoginCommand({ userId: payload.userId, userIp, userAgent })
		)
		this.setTokensToResponse(tokens, res)
	}

	@Public()
	@Post('logout')
	@UseGuards(GUARDS.JwtRefreshGuard)
	public async logout(
		@Req() req: Request & { payload: JwtRefreshPayload },
		@Res() res: Response
	): Promise<void> {
		const { sessionId }: JwtRefreshPayload = req.user as JwtRefreshPayload

		await this.commandBus.execute(new AC.LogoutCommand({ sessionId }))
		res.clearCookie(REFRESH_TOKEN).send()
	}

	@Get('me')
	public async me(@CurrentUser() user: User): Promise<User> {
		return user
	}

	// Helpers
	private setTokensToResponse(tokens: ITokens, res: Response): void {
		res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: true
		}).json({ accessToken: tokens.accessToken })
	}
}
