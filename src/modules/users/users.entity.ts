import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserObjectType {
	@Field(() => Int, { description: 'unique user id' })
	readonly id: string

	@Field(() => String, { description: 'unique login' })
	readonly email: string

	@Field(() => String, { description: 'unique email' })
	readonly login: string

	@Field(() => Boolean, { description: 'is user blocked' })
	readonly isBlocked: boolean

	@Field(() => Date, { description: 'user created date' })
	readonly createdAt: Date

	@Field(() => Date, { description: 'user last updated date' })
	readonly updatedAt: Date
}

@ObjectType()
export class MyObjectType {
	@Field(() => String)
	string1: string

	@Field(() => String)
	string2: string
}
