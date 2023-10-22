import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { User } from '@prisma/client'
import { Request } from 'express'

export const CurrentUser = createParamDecorator(
	(key: keyof User, ctx: ExecutionContext): keyof (keyof User) | User => {
		const req: Request = ctx.switchToHttp().getRequest()

		return req.user as User
	}
)
