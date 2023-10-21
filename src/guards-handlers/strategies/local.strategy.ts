import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Strategy } from 'passport-local'
import { UsersService } from '@users/users.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
	constructor(private readonly usersService: UsersService) {
		super({
			usernameField: 'emailOrLogin'
		})
	}

	public async validate(emailOrLogin: string, passw: string): Promise<User> {
		const user: User | null = await this.usersService.validate(emailOrLogin, passw)

		if (!user)
			throw new UnauthorizedException({
				message: 'Invalid login or password',
				error: 'Unauthorized',
				status: HttpStatus.UNAUTHORIZED,
				context: 'invalid-credentials'
			})

		return user
	}
}
