import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../../../prisma/prisma.service'
import { SessionsService } from './sessions.service'
import { SessionsRepo } from '../repositories/sessions.repo'

describe('UsersService', (): void => {
	let sessionsService: SessionsService
	let sessionsRepo: SessionsRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SessionsService,
				{
					provide: SessionsRepo,
					useValue: {}
				}
			]
		}).compile()

		sessionsService = module.get<SessionsService>(SessionsService)
		sessionsRepo = module.get<SessionsRepo>(SessionsRepo)
	})

	test('should be defined', (): void => {
		expect(sessionsService).toBeDefined()
	})
})
