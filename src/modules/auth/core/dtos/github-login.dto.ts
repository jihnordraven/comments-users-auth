import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	Length,
	Matches
} from 'class-validator'
import { EmailPattern, LoginPattern } from '../../../../utils/patterns'

export class GithubLoginDto {
	@IsNotEmpty()
	@IsInt()
	readonly id: string

	@IsNotEmpty()
	@IsString()
	@Matches(LoginPattern())
	@Length(3, 18)
	readonly login: string

	@IsOptional()
	@IsString()
	@Matches(EmailPattern())
	readonly email?: string
}
