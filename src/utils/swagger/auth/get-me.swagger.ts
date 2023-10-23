import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiHeader, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ACCESS_TOKEN } from '../../../utils/constants'

export const SwaggerToGetMe = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: `Get short info about current user` }),

		ApiHeader({
			name: 'Authorization',
			description: 'Bearer token',
			example:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}),

		ApiResponse({
			status: HttpStatus.OK,
			description: `Success. Receive short info about current user `
		}),
		ApiResponse({
			status: HttpStatus.UNAUTHORIZED,
			description: `${ACCESS_TOKEN} is invalid, expired or missing`
		}),
		ApiResponse({
			status: HttpStatus.NOT_FOUND,
			description: "If the user doesn't exist"
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'The server is not responding'
		})
	)
}
