import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { CommandBus } from '@nestjs/cqrs'

describe('AuthController', () => {
	let authController: AuthController
	let commandBus: CommandBus

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [CommandBus]
		}).compile()

		authController = module.get<AuthController>(AuthController)
		commandBus = module.get<CommandBus>(CommandBus)
	})

	test('should be defined', () => {
		expect(authController).toBeDefined()
	})
})
