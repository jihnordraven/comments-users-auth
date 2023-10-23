import { Test, TestingModule } from '@nestjs/testing'
import { GithubController } from './github.controller'
import { ConfigService } from '@nestjs/config'
import { CommandBus } from '@nestjs/cqrs'

describe('GithubController', (): void => {
	let githubController: GithubController

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GithubController],
			providers: [
				{
					provide: ConfigService,
					useValue: {
						getOrThrow: jest.fn()
					}
				},
				{
					provide: CommandBus,
					useValue: {
						execute: jest.fn()
					}
				}
			]
		}).compile()

		githubController = module.get<GithubController>(GithubController)
	})

	it('should be defined', (): void => {
		expect(githubController).toBeDefined()
	})
})
