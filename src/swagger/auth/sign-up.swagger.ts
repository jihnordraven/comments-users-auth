import { HttpStatus, applyDecorators } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { SignUpDto } from '../../modules/auth/core/dtos'

export const SwaggerToSignUp = (): MethodDecorator => {
	return applyDecorators(
		ApiOperation({ summary: 'User sign up with local credentials' }),

		ApiBody({
			type: SignUpDto,
			examples: {
				example: {
					value: {
						email: 'example@gmail.com',
						login: 'example-login',
						passw: 'Password123%'
					}
				}
			}
		}),

		ApiResponse({
			status: HttpStatus.NO_CONTENT,
			description: 'User account was created successfully'
		}),
		ApiResponse({
			status: HttpStatus.BAD_REQUEST,
			description: 'Invalid data from user'
		}),
		ApiResponse({
			status: HttpStatus.CONFLICT,
			description: 'Email or login are already registered'
		}),
		ApiResponse({
			status: HttpStatus.INTERNAL_SERVER_ERROR,
			description: 'Fatall error on the server side'
		})
	)
}
