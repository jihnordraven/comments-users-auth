import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '@prisma/client'

export const CurrentUserGql = createParamDecorator(
	(key: keyof User, ctx: ExecutionContext): keyof User | User => {
		const gqlCtx = GqlExecutionContext.create(ctx).getContext()
		return key ? gqlCtx.req.user[key] : gqlCtx.req.user
	}
)
