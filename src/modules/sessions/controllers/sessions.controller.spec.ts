import { Test, TestingModule } from '@nestjs/testing'
import { SessionsController } from './sessions.controller'
import { SessionsService } from '../services/sessions.service'

describe('SessionsController', (): void => {
	let sessionsController: SessionsController

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SessionsController],
			providers: [
				{
					provide: SessionsService,
					useValue: {}
				}
			]
		}).compile()

		sessionsController = module.get<SessionsController>(SessionsController)
	})

	test('should be defined', (): void => {
		expect(sessionsController).toBeDefined()
	})
})
