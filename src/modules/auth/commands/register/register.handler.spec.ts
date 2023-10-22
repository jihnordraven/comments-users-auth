import { Test, TestingModule } from '@nestjs/testing'
import { UsersRepo } from '../../../../modules/users/repositories/users-repo/users.repo'
import { MAILER_SERVICE } from '../../../../utils/constants'
import { RegisterHandler } from './register.handler'

describe('LoginHandler', (): void => {
	let registerHandler: RegisterHandler

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				RegisterHandler,
				{
					provide: MAILER_SERVICE,
					useValue: {}
				},
				{
					provide: UsersRepo,
					useValue: {}
				}
			]
		}).compile()

		registerHandler = module.get<RegisterHandler>(RegisterHandler)
	})

	it('should be defined', (): void => {
		expect(registerHandler).toBeDefined()
	})
})
