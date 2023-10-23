import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { memoryStore } from 'cache-manager'
import { PrismaModule } from '../prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { UsersModule } from './modules/users/users.module'
import { STRATEGIES } from './guards-handlers/strategies'
import { GUARDS } from './guards-handlers/guards'
import { APP_GUARD } from '@nestjs/core'
import { SessionsModule } from './modules/sessions/sessions.module'
import { AppController } from './app.controller'
import { redisStore } from 'cache-manager-redis-yet'
import { GoogleProfilesModule } from './modules/google-profiles/google-profiles.module';
import { GithubProfilesModule } from './modules/github-profiles/github-profiles.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.local.env'
		}),
		CacheModule.registerAsync({
			isGlobal: true,
			imports: [ConfigModule],
			useFactory: async (config: ConfigService) => ({
				store: await redisStore({
					database: config.getOrThrow<number>('REDIS_DB'),
					password: config.getOrThrow<string>('REDIS_PASS'),
					socket: {
						host: config.getOrThrow<string>('REDIS_HOST'),
						port: config.getOrThrow<number>('REDIS_PORT')
					}
				})
			}),
			inject: [ConfigService]
		}),
		PrismaModule,
		AuthModule,
		UsersModule,
		SessionsModule,
		GoogleProfilesModule,
		GithubProfilesModule
	],
	controllers: [AppController],
	providers: [...STRATEGIES, { provide: APP_GUARD, useClass: GUARDS.JwtAccessGuard }]
})
export class AppModule {}
