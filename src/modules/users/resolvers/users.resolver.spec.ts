import { Test, TestingModule } from '@nestjs/testing'
import { UsersResolver } from './users.resolver'
import { UsersRepo } from '../repositories/users-repo/users.repo'
import { UsersQueryRepo } from '../repositories/users-query-repo/users-query.repo'

describe('UsersResolver', (): void => {
	let usersResolver: UsersResolver

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersResolver,
				{
					provide: UsersRepo,
					useValue: {}
				},
				{
					provide: UsersQueryRepo,
					useValue: {}
				}
			]
		}).compile()

		usersResolver = module.get<UsersResolver>(UsersResolver)
	})

	test('should be defined', (): void => {
		expect(usersResolver).toBeDefined()
	})
})
