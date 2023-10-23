import { Test, TestingModule } from '@nestjs/testing'
import { UsersRepo } from '../../../../modules/users/repositories/users-repo/users.repo'
import { AuthService } from '../../services/auth.service'
import { GithubLoginHandler } from './github-login.handler'
import { GithubProfilesRepo } from '../../../../modules/github-profiles/repositories/github-profiles.repo'

describe('GithubLoginHandler', (): void => {
	let githubLoginHandler: GithubLoginHandler

	beforeEach(async (): Promise<void> => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				GithubLoginHandler,
				{
					provide: GithubProfilesRepo,
					useValue: {}
				},
				{
					provide: UsersRepo,
					useValue: {}
				}
			]
		}).compile()

		githubLoginHandler = module.get<GithubLoginHandler>(GithubLoginHandler)
	})

	it('should be defined', (): void => {
		expect(githubLoginHandler).toBeDefined()
	})
})
