import { Field, InputType } from '@nestjs/graphql'
import { IsOptional, Length, Matches, Validate } from 'class-validator'
import { IsTrim } from '../../../../utils/constaints/is-trim.constraint'
import { EmailPattern, LoginPattern, PasswPattern } from '../../../../utils/patterns'

@InputType()
export class UpdateUserInput {
	@Field()
	@IsOptional()
	@Matches(EmailPattern())
	@Validate(IsTrim)
	readonly email: string

	@Field()
	@IsOptional()
	@Matches(LoginPattern())
	@Length(3, 18)
	@Validate(IsTrim)
	readonly login: string

	@Field()
	@IsOptional()
	@Matches(PasswPattern())
	@Length(6, 18)
	@Validate(IsTrim)
	readonly passw: string
}
