import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { GoogleProfile } from '@prisma/client'
import { Cache } from 'cache-manager'
import { PrismaService } from '../../../../prisma/prisma.service'
import { CreateGoogleProfile } from '../core/types/create-google-profile.type'
import { red } from 'colorette'

@Injectable()
export class GoogleProfilesRepo {
	private readonly logger: Logger = new Logger(GoogleProfilesRepo.name)

	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async create(data: CreateGoogleProfile): Promise<GoogleProfile> {
		const googleProfile: GoogleProfile | void = await this.prisma.googleProfile
			.create({
				data
			})
			.catch((err: string) => {
				this.logger.error(red(err))
				throw new InternalServerErrorException(
					`Unable to create a google profile. Error: ${err}`
				)
			})

		await this.cache.set(
			`google-profile-sub-${googleProfile.sub}`,
			googleProfile,
			1800
		)
		return googleProfile
	}

	public async findBySub(sub: string): Promise<GoogleProfile | null> {
		const googleProfile: GoogleProfile | null = await this.cache.get<GoogleProfile>(
			`google-profile-sub-${sub}`
		)
		if (!googleProfile) {
			const googleProfile: GoogleProfile | null =
				await this.prisma.googleProfile.findUnique({
					where: { sub }
				})
			if (!googleProfile) return null
			await this.cache.set(`google-profile-sub-${sub}`, googleProfile, 1800)
			return googleProfile
		}
		return googleProfile
	}

	public async findByUserId(userId: string): Promise<GoogleProfile | null> {
		const googleProfile: GoogleProfile | null = await this.cache.get<GoogleProfile>(
			`google-profile-userId-${userId}`
		)
		if (!googleProfile) {
			const googleProfile: GoogleProfile | null =
				await this.prisma.googleProfile.findUnique({
					where: { userId }
				})
			if (!googleProfile) return null
			await this.cache.set(`google-profile-userId-${userId}`, googleProfile, 1800)
			return googleProfile
		}
		return googleProfile
	}
}
