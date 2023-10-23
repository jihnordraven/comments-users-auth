import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UserObjectType } from '../users.entity'
import { User } from '@prisma/client'
import { UsersQueryRepo } from '../repositories/users-query-repo/users-query.repo'
import { UsersRepo } from '../repositories/users-repo/users.repo'
import { ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { GUARDS } from '../../../guards-handlers/guards'
import { CurrentUserGql, Public } from '../../../utils/decorators'
import { UpdateUserInput } from '../core/inputs/update-user.input'

@Public()
@UseGuards(GUARDS.JwtGqlGuard)
@Resolver(() => UserObjectType)
export class UsersResolver {
	constructor(
		private readonly usersQueryRepo: UsersQueryRepo,
		private readonly usersRepo: UsersRepo
	) {}

	@Query(() => UserObjectType, { name: 'user' })
	public async findOneUser(@Args('id') id: string): Promise<User> {
		return this.usersQueryRepo.findOne(id)
	}

	@Mutation(() => UserObjectType)
	public async updateUser(
		@CurrentUserGql('id', ParseUUIDPipe) userId: string,
		@Args('input') input: UpdateUserInput
	): Promise<User> {
		return this.usersRepo.update(userId, { ...input })
	}

	@Mutation(() => UserObjectType)
	public async deleteUser(@CurrentUserGql('id') userId: string): Promise<User> {
		return this.usersRepo.delete(userId)
	}

	// @Query(() => [UserObjectType], { name: 'uesrs' })
	// public async findManyUsers(
	// 	@Args('orderByDate') orderByDate: Prisma.SortOrder,
	// 	@Args('orderByLikes') orderByLikes: Prisma.SortOrder,
	// 	@Args('orderByViews') orderByViews: Prisma.SortOrder,
	// 	@Args('orderBySubscribers') orderBySubscribers: Prisma.SortOrder
	// ): Promise<any> {}
}
