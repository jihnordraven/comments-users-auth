import { Test, TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'
import { UsersRepo } from '../repositories/users-repo/users.repo'

describe('UsersService', (): void => {
	let usersService: UsersService

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					provide: UsersRepo,
					useValue: {}
				}
			]
		}).compile()

		usersService = module.get<UsersService>(UsersService)
	})

	test('should be defined', (): void => {
		expect(usersService).toBeDefined()
	})

	describe('validate', (): void => {
		test("should return null if there aren't loginOrEmail or passw", (): void => {})
	})
})
