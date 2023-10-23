import { Test, TestingModule } from '@nestjs/testing'
import { GoogleLoginHandler } from './google-login.handler'
import { GoogleProfilesRepo } from '../../../../modules/google-profiles/repositories/google-profiles.repo'
import { UsersRepo } from '../../../../modules/users/repositories/users-repo/users.repo'
import { AuthService } from '../../services/auth.service'

describe('GoogleLoginHandler', (): void => {
	let googleLoginHandler: GoogleLoginHandler

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GoogleLoginHandler,
				{
					provide: GoogleProfilesRepo,
					useValue: {}
				},
				{
					provide: UsersRepo,
					useValue: {}
				},
				{
					provide: AuthService,
					useValue: {}
				}
			]
		}).compile()

		googleLoginHandler = module.get<GoogleLoginHandler>(GoogleLoginHandler)
	})

	it('should be defined', (): void => {
		expect(googleLoginHandler).toBeDefined()
	})
})
