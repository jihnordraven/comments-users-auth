import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtGqlGuard extends AuthGuard('jwt-gql') {
	getRequest(context: ExecutionContext) {
		const gqlContext: GqlExecutionContext = GqlExecutionContext.create(context)

		return gqlContext.getContext().req
	}
}
