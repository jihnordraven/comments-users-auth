import { Test, TestingModule } from '@nestjs/testing'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { PrismaService } from '../../../../prisma/prisma.service'
import { GoogleProfilesRepo } from './google-profiles.repo'

describe('GithubProfilesRepo', (): void => {
	let googleProfilesRepo: GoogleProfilesRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GoogleProfilesRepo,
				{
					provide: CACHE_MANAGER,
					useValue: {}
				},
				{
					provide: PrismaService,
					useValue: {}
				}
			]
		}).compile()

		googleProfilesRepo = module.get<GoogleProfilesRepo>(GoogleProfilesRepo)
	})

	it('should be defined', (): void => {
		expect(googleProfilesRepo).toBeDefined()
	})
})
