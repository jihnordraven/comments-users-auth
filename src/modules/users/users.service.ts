import { ForbiddenException, Injectable } from '@nestjs/common'
import { UsersRepo } from './repositories/users.repo'
import { User } from '@prisma/client'
import { compare } from 'bcrypt'

@Injectable()
export class UsersService {
	constructor(private readonly usersRepo: UsersRepo) {}

	public async validate(emailOrLogin: string, passw: string): Promise<User | null> {
		if (!emailOrLogin || !passw) return null

		const user: User | null = await this.usersRepo.findByEmailOrLogin(emailOrLogin)
		if (!user) return null

		if (user.isBlocked) throw new ForbiddenException('Account has been blocked')

		const isValidPassw: boolean = await compare(passw, user.hashPassw)
		if (!isValidPassw) return null

		return user
	}
}
