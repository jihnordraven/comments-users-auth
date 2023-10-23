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
import { CurrentUser, Public, UserAgent } from '../../../utils/decorators'
import { CommandBus } from '@nestjs/cqrs'
import { AC } from '../commands'
import { SignUpDto } from '../core/dtos'
import { Request, Response } from 'express'
import { User } from '@prisma/client'
import { ITokens } from '../commands/login/login.handler'
import { REFRESH_TOKEN } from '../../../utils/constants'
import { GUARDS } from '../../../guards-handlers/guards'
import { JwtRefreshPayload } from '../../../guards-handlers/strategies/jwt-refresh.strategy'
import { ApiTags } from '@nestjs/swagger'
import { AUTH_SWAGGER } from 'src/swagger'

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
	constructor(private readonly commandBus: CommandBus) {}

	@AUTH_SWAGGER.SwaggerToSignUp()
	@Public()
	@Post('signUp')
	@HttpCode(HttpStatus.OK)
	public async signUp(@Body() dto: SignUpDto): Promise<Partial<User>> {
		return this.commandBus.execute(new AC.RegisterCommand(dto))
	}

	@AUTH_SWAGGER.SwaggerToSignIn()
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

	@AUTH_SWAGGER.SwaggerToRefresh()
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

	@AUTH_SWAGGER.SwaggerToLogout()
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

	@AUTH_SWAGGER.SwaggerToGetMe()
	@Get('me')
	@HttpCode(HttpStatus.OK)
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
