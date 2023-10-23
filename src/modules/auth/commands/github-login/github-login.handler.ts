import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GithubLoginCommand } from './github-login.command'
import { GithubProfile, User } from '@prisma/client'
import { GithubProfilesRepo } from '../../../../modules/github-profiles/repositories/github-profiles.repo'
import { UsersRepo } from '../../../../modules/users/repositories/users-repo/users.repo'

@CommandHandler(GithubLoginCommand)
export class GithubLoginHandler implements ICommandHandler<GithubLoginCommand> {
	constructor(
		protected readonly githubProfilesRepo: GithubProfilesRepo,
		protected readonly usersRepo: UsersRepo
	) {}

	public async execute({ input }: GithubLoginCommand): Promise<GithubProfile> {
		const { sub, email = '', login } = input

		const githubProfile: GithubProfile | null =
			await this.githubProfilesRepo.findBySub(sub)

		if (!githubProfile) {
			const user: User | null = await this.usersRepo.findByEmail(email ? email : '')

			if (!user) {
				const user: Partial<User> = await this.usersRepo.create({
					email,
					login
				})
				return this.githubProfilesRepo.create({
					sub,
					login,
					email,
					userId: user.id
				})
			}

			return this.githubProfilesRepo.create({
				sub,
				login,
				email,
				userId: user.id
			})
		}

		return githubProfile
	}
}
