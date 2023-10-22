import { IsBoolean, IsOptional } from 'class-validator'

export class GetManyUsersDto {
	@IsOptional()
	@IsBoolean()
	readonly isBlocked?: string
}
