import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { UsersModule } from '@users/users.module'
import { SessionsModule } from '@sessions/sessions.module'
import { AH } from './commands'
import { JwtModule } from '@nestjs/jwt'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

@Module({
	imports: [
		CqrsModule,
		JwtModule,
		ClientsModule.registerAsync([
			{
				name: 'MAILER_SERVICE',
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
		SessionsModule
	],
	controllers: [AuthController],
	providers: [...AH]
})
export class AuthModule {}
