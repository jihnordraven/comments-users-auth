import { SwaggerToGetMe } from './auth/get-me.swagger'
import { SwaggerToLogout } from './auth/logout.swagger'
import { SwaggerToRefresh } from './auth/refresh.swagger'
import { SwaggerToSignIn } from './auth/sign-in.swagger'
import { SwaggerToSignUp } from './auth/sign-up.swagger'

export * from './swagger.setup'

export const AUTH_SWAGGER = {
	SwaggerToSignUp,
	SwaggerToSignIn,
	SwaggerToRefresh,
	SwaggerToLogout,
	SwaggerToGetMe
}
