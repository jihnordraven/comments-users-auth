import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { AH } from './commands'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { MAILER_SERVICE } from '../../utils/constants'
import { UsersModule } from '../users/users.module'
import { SessionsModule } from '../sessions/sessions.module'
import { GoogleController } from './controllers/google-controller/google.controller'
import { AuthService } from './services/auth.service'
import { GoogleProfilesModule } from '../google-profiles/google-profiles.module'
import { GithubController } from './controllers/github-controller/github.controller'
import { GithubProfilesModule } from '../github-profiles/github-profiles.module'

@Module({
	imports: [
		CqrsModule,
		JwtModule,
		ClientsModule.registerAsync([
			{
				name: MAILER_SERVICE,
				useFactory: (config: ConfigService) => ({
					transport: Transport.RMQ,
					options: {
						urls: [config.getOrThrow<string>('RMQ_HOST')],
						queue: config.getOrThrow<string>('RMQ_QUEUE')
					}
				}),
				inject: [ConfigService]
			}
		]),
		UsersModule,
		SessionsModule,
		GoogleProfilesModule,
		GithubProfilesModule
	],
	controllers: [AuthController, GoogleController, GithubController],
	providers: [AuthService, ...AH]
})
export class AuthModule {}
