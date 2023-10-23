import { Module } from '@nestjs/common'
import { GithubProfilesRepo } from './repositories/github-profiles.repo'

@Module({
	providers: [GithubProfilesRepo],
	exports: [GithubProfilesRepo]
})
export class GithubProfilesModule {}
