import { User } from '@prisma/client'
import { Exclude, Expose } from 'class-transformer'

export class UserResponse implements User {
	constructor(private user: User) {
		this.id = user.id
		this.email = user.email
		this.login = user.login
		this.hashPassw = user.hashPassw
		this.isBlocked = user.isBlocked
		this.createdAt = user.createdAt
		this.updatedAt = user.updatedAt
	}

	@Expose()
	readonly id: string

	@Expose()
	readonly email: string

	@Expose()
	readonly login: string

	@Exclude()
	readonly hashPassw: string

	@Expose()
	readonly isBlocked: boolean

	@Expose()
	createdAt: Date

	@Expose()
	updatedAt: Date
}
