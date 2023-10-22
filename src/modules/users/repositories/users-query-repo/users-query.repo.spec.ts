import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../../../../../prisma/prisma.service'
import { UsersQueryRepo } from './users-query.repo'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

describe('UsersRepo', () => {
	let usersQueryRepo: UsersQueryRepo

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersQueryRepo,
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

		usersQueryRepo = module.get<UsersQueryRepo>(UsersQueryRepo)
	})

	test('should be defined', (): void => {
		expect(usersQueryRepo).toBeDefined()
	})
})
