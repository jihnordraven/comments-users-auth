import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator'
import { EmailPattern } from '../../../../utils/patterns'

export class GoogleSignInDto {
	@IsNotEmpty()
	@IsString()
	@IsUUID()
	readonly sub: string

	@IsNotEmpty()
	@IsString()
	@Matches(EmailPattern())
	readonly email: string
}
