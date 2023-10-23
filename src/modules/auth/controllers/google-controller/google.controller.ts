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
import { GUARDS } from '../../../../guards-handlers/guards'
import { Public, UserAgent } from '../../../../utils/decorators'
import { Request, Response } from 'express'
import { ConfigService } from '@nestjs/config'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../../utils/constants'
import { ApiTags } from '@nestjs/swagger'
import { GoogleSignInDto } from '../../core/dtos'
import { CommandBus } from '@nestjs/cqrs'
import { AC } from '../../commands'
import { GoogleProfile } from '@prisma/client'
import { ITokens } from '../../commands/login/login.handler'

@ApiTags('Auth Google Controller')
@Public()
@Controller('auth/google')
export class GoogleController {
	constructor(
		private readonly config: ConfigService,
		private readonly commandBus: CommandBus
	) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@UseGuards(GUARDS.GoogleGuard)
	public getSession(): void {}

	@Get('callback')
	@UseGuards(GUARDS.GoogleGuard)
	public callback(@Req() req: Request, @Res() res: Response) {
		const accessToken: string = req.user as string

		res.redirect(
			`${this.config.getOrThrow<string>(
				'FRONTEND_HOST'
			)}/auth/callback/google?${ACCESS_TOKEN}=${accessToken}`
		)
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	public async signIn(
		@Body() dto: GoogleSignInDto,
		@Res() res: Response,
		@UserAgent() userAgent: string,
		@Ip() userIp: string
	): Promise<void> {
		const googleProfile: GoogleProfile = await this.commandBus.execute(
			new AC.GoogleLoginCommand(dto)
		)

		const tokens: ITokens = await this.commandBus.execute(
			new AC.LoginCommand({ userId: googleProfile.userId, userIp, userAgent })
		)
		res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: true
		}).json({ accessToken: tokens.accessToken })
	}
}
