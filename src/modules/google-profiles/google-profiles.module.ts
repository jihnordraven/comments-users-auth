import { Module } from '@nestjs/common'
import { GoogleProfilesRepo } from './repositories/google-profiles.repo'

@Module({
	providers: [GoogleProfilesRepo],
	exports: [GoogleProfilesRepo]
})
export class GoogleProfilesModule {}
