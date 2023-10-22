import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { memoryStore } from 'cache-manager'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { STRATEGIES } from './guards-handlers/strategies'
import { GUARDS } from './guards-handlers/guards'
import { APP_GUARD } from '@nestjs/core'
import { SessionsModule } from './modules/sessions/sessions.module'
import { AppController } from './app.controller'

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
	controllers: [AppController],
	providers: [...STRATEGIES, { provide: APP_GUARD, useClass: GUARDS.JwtAccessGuard }]
})
export class AppModule {}
