import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { GoogleController } from './google.controller'
import { CommandBus } from '@nestjs/cqrs'

describe('GithubController', (): void => {
	let googleController: GoogleController

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [GoogleController],
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

		googleController = module.get<GoogleController>(GoogleController)
	})

	it('should be defined', (): void => {
		expect(googleController).toBeDefined()
	})
})
