import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersRepo } from '../../modules/users/repositories/users-repo/users.repo'
import { Request } from 'express'
import { CONFIG } from '../../config'

export type JwtAccessPayload = {
	userId: string
	iat: number
	exp: number
}

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt-access') {
	constructor(private readonly usersRepo: UsersRepo) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: CONFIG.JWT_ACCESS_SECRET,
			ignoreExpiration: false
		})
	}

	public async validate(payload: JwtAccessPayload): Promise<User> {
		const user: User | null = await this.usersRepo.findById(payload.userId)
		if (!user) throw new UnauthorizedException("User doesn't exist")

		return user
	}
}
