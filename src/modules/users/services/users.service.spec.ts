import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { UsersRepo } from '../repositories/users-repo/users.repo'
import { GoogleProfilesRepo } from '../../../modules/google-profiles/repositories/google-profiles.repo'
import { GithubProfilesRepo } from '../../../modules/github-profiles/repositories/github-profiles.repo'

describe('UsersService', (): void => {
	let usersService: UsersService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: UsersRepo,
					useValue: {
						findByEmailOrLogin: jest.fn()
					}
				},
				{
					provide: GoogleProfilesRepo,
					useValue: {
						findByUser: jest.fn()
					}
				},
				{
					provide: GithubProfilesRepo,
					useValue: {
						findByUser: jest.fn()
					}
				}
			]
		}).compile()

		usersService = module.get<UsersService>(UsersService)
	})

	test('should be defined', (): void => {
		expect(usersService).toBeDefined()
	})
})
