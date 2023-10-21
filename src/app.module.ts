import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { memoryStore } from 'cache-manager'
import { PrismaModule } from 'prisma/prisma.module'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.register({
			isGlobal: true,
			store: memoryStore
		}),
		PrismaModule
	]
})
export class AppModule {}
