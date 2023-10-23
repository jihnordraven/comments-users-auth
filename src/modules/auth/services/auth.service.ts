import { Injectable } from '@nestjs/common'
import { User } from '@sentry/node'
import { UsersRepo } from '../../../modules/users/repositories/users-repo/users.repo'

@Injectable()
export class AuthService {
	constructor(private readonly usersRepo: UsersRepo) {}

	public async genUniqueUsername({ prefix }: { prefix: string }): Promise<string> {
		let isUsernameTaken: User | null
		let uniqueUsername: string = 'google-1'
		let suffix: number = 1

		do {
			isUsernameTaken = await this.usersRepo.findByLogin(uniqueUsername)
			if (isUsernameTaken) {
				uniqueUsername = `${prefix}-${suffix}`
				suffix++
			}
		} while (isUsernameTaken)

		return uniqueUsername
	}
}
