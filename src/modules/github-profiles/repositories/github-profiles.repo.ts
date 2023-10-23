import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { PrismaService } from '../../../../prisma/prisma.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { CreateGithubProfile } from '../core/types'
import { GithubProfile } from '@prisma/client'
import { red } from 'colorette'

@Injectable()
export class GithubProfilesRepo {
	private readonly logger: Logger = new Logger(GithubProfilesRepo.name)

	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async create(data: CreateGithubProfile): Promise<GithubProfile> {
		const githubProfile: GithubProfile | void = await this.prisma.githubProfile
			.create({ data })
			.catch((err: string) => {
				this.logger.error(red(err))
				throw new InternalServerErrorException(
					`Unable to craete a github profile. Error: ${err}`
				)
			})
		return githubProfile
	}

	public async findBySub(sub: string): Promise<GithubProfile | null> {
		const githubProfile: GithubProfile | null = await this.cache.get<GithubProfile>(
			`github-profile-sub-${sub}`
		)
		if (!githubProfile) {
			const githubProfile: GithubProfile | null =
				await this.prisma.githubProfile.findUnique({
					where: { sub }
				})
			if (!githubProfile) return githubProfile
			await this.cache.set(`github-profile-sub-${sub}`, githubProfile, 1800)
			return githubProfile
		}
		return githubProfile
	}

	public async findByUserId(userId: string): Promise<GithubProfile | null> {
		const githubProfile: GithubProfile | null = await this.cache.get<GithubProfile>(
			`github-profile-userId-${userId}`
		)
		if (!githubProfile) {
			const githubProfile: GithubProfile | null =
				await this.prisma.githubProfile.findUnique({
					where: { userId }
				})
			if (!githubProfile) return githubProfile
			await this.cache.set(`github-profile-userId-${userId}`, githubProfile, 1800)
			return githubProfile
		}
		return githubProfile
	}
}
