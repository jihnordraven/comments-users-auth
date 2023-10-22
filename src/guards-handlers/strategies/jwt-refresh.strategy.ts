import { SessionsService } from '@sessions/sessions.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Session, User } from '@prisma/client'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'
import { UsersRepo } from '@users/repositories/users.repo'
import { REFRESH_TOKEN } from '@constants'
import { CONFIG } from 'src/config'

export type JwtRefreshPayload = {
	userId: string
	sessionId: string
	iat: number
	exp: number
}

const ExtractJwtFromCookies = (req: Request): string => {
	let token: string = ''
	if (req && req.cookies) {
		token = req.cookies[REFRESH_TOKEN]
	}
	return token
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(
		private readonly sessionsService: SessionsService,
		private readonly usersRepo: UsersRepo
	) {
		super({
			jwtFromRequest: (req: Request) => ExtractJwtFromCookies(req),
			secretOrKey: CONFIG.JWT_REFRESH_SECRET,
			ignoreExpiration: false
		})
	}

	public async validate(payload: JwtRefreshPayload): Promise<JwtRefreshPayload> {
		const session: Session | null = await this.sessionsService.validate(
			payload.sessionId
		)
		const user: User | null = await this.usersRepo.findById(payload.userId)

		if (!session || !user || user.id !== payload.userId)
			throw new UnauthorizedException('Please log in again')

		return payload
	}
}
