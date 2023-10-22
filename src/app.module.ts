import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { memoryStore } from 'cache-manager'
import { PrismaModule } from 'prisma/prisma.module'
import { AuthModule } from '@auth/auth.module'
import { UsersModule } from '@users/users.module'
import { SessionsModule } from '@sessions/sessions.module'
import { STRATEGIES } from './guards-handlers/strategies'
import { APP_GUARD } from '@nestjs/core'
import { GUARDS } from '@guards'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.local.env'
		}),
		CacheModule.register({
			isGlobal: true,
			store: memoryStore
		}),
		PrismaModule,
		AuthModule,
		UsersModule,
		SessionsModule
	],
	providers: [...STRATEGIES, { provide: APP_GUARD, useClass: GUARDS.JwtAccessGuard }]
})
export class AppModule {}
