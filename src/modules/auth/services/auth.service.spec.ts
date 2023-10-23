import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { UsersRepo } from '../../../modules/users/repositories/users-repo/users.repo'

describe('AuthService', (): void => {
	let authService: AuthService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UsersRepo,
					useValue: {}
				}
			]
		}).compile()

		authService = module.get<AuthService>(AuthService)
	})

	it('should be defined', (): void => {
		expect(authService).toBeDefined()
	})
})
