import { Test, TestingModule } from '@nestjs/testing'
import { LogoutHandler } from './logout.handler'
import { SessionsRepo } from '../../../../modules/sessions/repositories/sessions.repo'

describe('LogoutHandler', (): void => {
	let logoutHandler: LogoutHandler

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				LogoutHandler,
				{
					provide: SessionsRepo,
					useValue: {}
				}
			]
		}).compile()

		logoutHandler = module.get<LogoutHandler>(LogoutHandler)
	})

	it('should be defined', (): void => {
		expect(logoutHandler).toBeDefined()
	})
})
