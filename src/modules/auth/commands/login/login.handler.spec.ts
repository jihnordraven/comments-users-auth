import { Test, TestingModule } from '@nestjs/testing'
import { LoginHandler } from './login.handler'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { SessionsRepo } from '../../../../modules/sessions/repositories/sessions.repo'

describe('LoginHandler', (): void => {
	let loginHandler: LoginHandler

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				LoginHandler,
				{
					provide: ConfigService,
					useValue: {}
				},
				{
					provide: JwtService,
					useValue: {}
				},
				{
					provide: SessionsRepo,
					useValue: {}
				}
			]
		}).compile()

		loginHandler = module.get<LoginHandler>(LoginHandler)
	})

	it('should be defined', (): void => {
		expect(loginHandler).toBeDefined()
	})
})
