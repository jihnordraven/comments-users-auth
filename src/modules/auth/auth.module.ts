import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { UsersModule } from '@users/users.module'
import { SessionsModule } from '@sessions/sessions.module'
import { AH } from './commands'
import { JwtModule } from '@nestjs/jwt'

@Module({
	imports: [CqrsModule, JwtModule, UsersModule, SessionsModule],
	controllers: [AuthController],
	providers: [...AH]
})
export class AuthModule {}
