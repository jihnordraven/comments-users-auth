import { Module } from '@nestjs/common'
import { UsersService } from './services/users.service'
import { UsersResolver } from './resolvers/users.resolver'
import { UsersRepo } from './repositories/users-repo/users.repo'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { UsersQueryRepo } from './repositories/users-query-repo/users-query.repo'
import { GoogleProfilesModule } from '../google-profiles/google-profiles.module'
import { GithubProfilesModule } from '../github-profiles/github-profiles.module'

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			typePaths: [join(process.cwd(), 'src/schema.gql')],
			sortSchema: true
		}),
		GoogleProfilesModule,
		GithubProfilesModule
	],
	providers: [UsersResolver, UsersService, UsersRepo, UsersQueryRepo],
	exports: [UsersService, UsersRepo]
})
export class UsersModule {}
