import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { UsersModule } from '../users/users.module'
import { SessionsModule } from '../sessions/sessions.module'

@Module({
	imports: [CqrsModule, UsersModule, SessionsModule],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}
