import { IsNotEmpty, IsString, Matches } from 'class-validator'
import { EmailPattern, LoginPattern, PasswPattern } from '../../../../utils/patterns'
import { ApiProperty } from '@nestjs/swagger'

export class SignUpDto {
	@ApiProperty({ pattern: String(EmailPattern()) })
	@IsNotEmpty()
	@IsString()
	@Matches(EmailPattern())
	readonly email: string

	@ApiProperty({ pattern: String(LoginPattern()) })
	@IsNotEmpty()
	@IsString()
	@Matches(LoginPattern())
	readonly login: string

	@ApiProperty({ pattern: String(PasswPattern()) })
	@IsNotEmpty()
	@IsString()
	@Matches(PasswPattern())
	readonly passw: string
}
