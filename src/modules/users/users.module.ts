import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { UsersRepo } from './repositories/users.repo'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { UsersQueryRepo } from './repositories/users-query.repo'

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true
		})
	],
	providers: [UsersResolver, UsersService, UsersRepo, UsersQueryRepo],
	exports: [UsersService, UsersRepo]
})
export class UsersModule {}
