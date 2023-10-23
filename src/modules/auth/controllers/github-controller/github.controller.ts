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
import { Request, Response } from 'express'
import { ConfigService } from '@nestjs/config'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../../utils/constants'
import { Public, UserAgent } from '../../../../utils/decorators'
import { ApiTags } from '@nestjs/swagger'
import { CommandBus } from '@nestjs/cqrs'
import { AC } from '../../commands'
import { ITokens } from '../../commands/login/login.handler'
import { GithubProfile } from '@prisma/client'
import { GithubLoginDto } from '../../core/dtos'

@ApiTags('Auth Github Endpoints')
@Public()
@Controller('auth/github')
export class GithubController {
	constructor(
		private readonly config: ConfigService,
		private readonly commandBus: CommandBus
	) {}

	@Get()
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(GUARDS.GithubGuard)
	public getSession(): void {}

	@Get('callback')
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(GUARDS.GithubGuard)
	public callback(@Req() req: Request, @Res() res: Response): void {
		const accessToken: string = req.user as string

		res.redirect(
			`${this.config.getOrThrow<string>(
				'FRONTEND_HOST'
			)}/auth/callback/github?${ACCESS_TOKEN}=${accessToken}`
		)
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	public async signIn(
		@Body() dto: GithubLoginDto,
		@Res() res: Response,
		@Ip() userIp: string,
		@UserAgent() userAgent: string
	): Promise<any> {
		const githubProfile: GithubProfile = await this.commandBus.execute(
			new AC.GithubLoginCommand({ sub: dto.id.toString(), ...dto })
		)

		const tokens: ITokens = await this.commandBus.execute(
			new AC.LoginCommand({ userId: githubProfile.userId, userIp, userAgent })
		)
		res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
			httpOnly: true,
			secure: true
		}).json({ accessToken: tokens.accessToken })
	}
}
