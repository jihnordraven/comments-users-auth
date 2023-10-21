import { SessionsService } from './../../modules/sessions/sessions.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Session, User } from '@prisma/client'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { SessionsRepo } from 'src/modules/sessions/sessions.repo'
import { UsersRepo } from 'src/modules/users/users.repo'
import { REFRESH_TOKEN } from 'src/utils/constants'

export type JwtRefreshPayload = {
	userId: string
	sessionId: string
	iat: number
	exp: number
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		private readonly config: ConfigService,
		private readonly sessionsService: SessionsService,
		private readonly usersRepo: UsersRepo
	) {
		super({
			jwtFromRequest: (req: Request) => req.cookies[REFRESH_TOKEN],
			secretOrKey: config.getOrThrow<string>('JWT_REFRESH_SECRET'),
			ignoreExpiration: false
		})
	}

	public async validate(payload: JwtRefreshPayload): Promise<User> {
		const session: Session | null = await this.sessionsService.validate(
			payload.sessionId
		)
		const user: User | null = await this.usersRepo.findById(payload.userId)

		if (!session || !user) throw new UnauthorizedException('Please log in again')
		return user
	}
}
