import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GoogleLoginCommand } from './google-login.command'
import { GoogleProfile, User } from '@prisma/client'
import { GoogleProfilesRepo } from '../../../../modules/google-profiles/repositories/google-profiles.repo'
import { UsersRepo } from '../../../../modules/users/repositories/users-repo/users.repo'
import { AuthService } from '../../services/auth.service'

@CommandHandler(GoogleLoginCommand)
export class GoogleLoginHandler implements ICommandHandler<GoogleLoginCommand> {
	constructor(
		protected readonly googleProfilesRepo: GoogleProfilesRepo,
		protected readonly usersRepo: UsersRepo,
		protected readonly authService: AuthService
	) {}

	public async execute({ input }: GoogleLoginCommand): Promise<GoogleProfile> {
		const { sub, email } = input

		const googleProfile: GoogleProfile | null =
			await this.googleProfilesRepo.findBySub(sub)

		if (!googleProfile) {
			const user: User | null = await this.usersRepo.findByEmail(email)

			if (!user) {
				let uniqueLogin = await this.authService.genUniqueUsername({
					prefix: 'google'
				})

				const user: Partial<User> = await this.usersRepo.create({
					email,
					login: uniqueLogin
				})

				return this.googleProfilesRepo.create({
					email,
					sub,
					userId: user.id
				})
			}

			// google profile doesn't exist | user exists
			return this.googleProfilesRepo.create({
				email,
				sub,
				userId: user.id
			})
		}

		// google profile exists
		return googleProfile
	}
}
