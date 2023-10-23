import {
	ForbiddenException,
	HttpException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { UsersRepo } from '../repositories/users-repo/users.repo'
import { GithubProfile, GoogleProfile, User } from '@prisma/client'
import { compare } from 'bcrypt'
import { GoogleProfilesRepo } from '../../../modules/google-profiles/repositories/google-profiles.repo'
import { GithubProfilesRepo } from '../../../modules/github-profiles/repositories/github-profiles.repo'

@Injectable()
export class UsersService {
	constructor(
		private readonly usersRepo: UsersRepo,
		private readonly googleProfilesRepo: GoogleProfilesRepo,
		private readonly githubProfilesRepo: GithubProfilesRepo
	) {}

	public async validate(emailOrLogin: string, passw: string): Promise<User | null> {
		if (!emailOrLogin || !passw) return null

		const user: User | null = await this.usersRepo.findByEmailOrLogin(emailOrLogin)
		if (!user) return null

		if (user.isBlocked) throw new ForbiddenException('Account has been blocked')

		if (!user.hashPassw) {
			const isGoogleProfile: GoogleProfile | null =
				await this.googleProfilesRepo.findByUserId(user.id)
			if (isGoogleProfile) {
				throw new UnauthorizedException(
					`You have a google account registered: ${isGoogleProfile.email}`
				)
			}

			const isGithubProfile: GithubProfile | null =
				await this.githubProfilesRepo.findByUserId(user.id)
			if (isGithubProfile) {
				throw new UnauthorizedException(
					`You have a github account registered: ${isGithubProfile.email}`
				)
			}
		}

		const isValidPassw: boolean = await compare(passw, user.hashPassw)
		if (!isValidPassw) return null

		return user
	}
}
