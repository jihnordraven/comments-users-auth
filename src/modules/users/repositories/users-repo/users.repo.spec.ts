import { Test, TestingModule } from '@nestjs/testing'
import { UsersRepo } from './users.repo'
import { PrismaService } from '../../../../../prisma/prisma.service'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

describe('UsersRepo', () => {
	let usersRepo: UsersRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersRepo,
				{
					provide: PrismaService,
					useValue: {}
				},
				{
					provide: CACHE_MANAGER,
					useValue: {}
				}
			]
		}).compile()

		usersRepo = module.get<UsersRepo>(UsersRepo)
	})

	test('should be defined', (): void => {
		expect(usersRepo).toBeDefined()
	})
})
