import { Test, TestingModule } from '@nestjs/testing'
import { GithubProfilesRepo } from './github-profiles.repo'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { PrismaService } from '../../../../prisma/prisma.service'

describe('GithubProfilesRepo', (): void => {
	let githubProfilesRepo: GithubProfilesRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GithubProfilesRepo,
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

		githubProfilesRepo = module.get<GithubProfilesRepo>(GithubProfilesRepo)
	})

	it('should be defined', (): void => {
		expect(githubProfilesRepo).toBeDefined()
	})
})
