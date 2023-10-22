import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { CONFIG } from 'src/config'
import { JwtAccessPayload } from './jwt-access.strategy'
import { User } from '@prisma/client'
import { UsersRepo } from '@users/repositories/users.repo'

@Injectable()
export class JwtGqlStrategy extends PassportStrategy(Strategy, 'jwt-gql') {
	constructor(private readonly usersRepo: UsersRepo) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: CONFIG.JWT_ACCESS_SECRET,
			ignoreExpiration: false
		})
	}

	public async validate(payload: JwtAccessPayload): Promise<User> {
		const user: User | null = await this.usersRepo.findById(payload.userId)

		if (!user) throw new UnauthorizedException()

		return user
	}
}
