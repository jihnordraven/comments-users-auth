import { Module } from '@nestjs/common'
import { SessionsService } from './sessions.service'
import { SessionsController } from './sessions.controller'
import { SessionsRepo } from './sessions.repo'

@Module({
	controllers: [SessionsController],
	providers: [SessionsService, SessionsRepo],
	exports: [SessionsService, SessionsRepo]
})
export class SessionsModule {}
