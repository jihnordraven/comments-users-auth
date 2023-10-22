import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { MyObjectType, UserObjectType } from '../users.entity'
import { User } from '@prisma/client'
import { UsersQueryRepo } from '../repositories/users-query-repo/users-query.repo'
import { UsersRepo } from '../repositories/users-repo/users.repo'
import { UseGuards } from '@nestjs/common'
import { GUARDS } from '../../../guards-handlers/guards'
import { Public } from '../../../utils/decorators'

@Public()
@UseGuards(GUARDS.JwtGqlGuard)
@Resolver(() => UserObjectType)
export class UsersResolver {
	constructor(
		private readonly usersQueryRepo: UsersQueryRepo,
		private readonly usersRepo: UsersRepo
	) {}

	@Query(() => UserObjectType, { name: 'user' })
	public async findOne(@Args('id') id: string): Promise<User> {
		return this.usersQueryRepo.findOne(id)
	}

	@Mutation(() => UserObjectType)
	public async update(
		@Args('email') email: string,
		@Args('login') login: string,
		@Args('passw') passw: string
	): Promise<User> {
		return this.usersRepo.update({ email, login, passw }, 'userId')
	}

	@Mutation(() => UserObjectType)
	public async delete(): Promise<User> {
		return this.usersRepo.delete('f')
	}

	// @Query(() => [UserObjectType], { name: 'uesrs' })
	// public async findMany(
	// 	@Args('orderByDate') orderByDate: Prisma.SortOrder,
	// 	@Args('orderByLikes') orderByLikes: Prisma.SortOrder,
	// 	@Args('orderByViews') orderByViews: Prisma.SortOrder,
	// 	@Args('orderBySubscribers') orderBySubscribers: Prisma.SortOrder
	// ): Promise<any> {}
}
