import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../../../prisma/prisma.service'
import { SessionsRepo } from './sessions.repo'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'

describe('SessionsRepo', (): void => {
	let sessionsRepo: SessionsRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SessionsRepo,
				{
					provide: PrismaService,
					useValue: {}
				},
				{
					provide: CACHE_MANAGER,
					useValue: {}
				},
				{
					provide: ConfigService,
					useValue: {}
				}
			]
		}).compile()

		sessionsRepo = module.get<SessionsRepo>(SessionsRepo)
	})

	test('should be defined', (): void => {
		expect(sessionsRepo).toBeDefined()
	})
})
