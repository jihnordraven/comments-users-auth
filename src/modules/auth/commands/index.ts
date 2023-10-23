import { RegisterCommand } from './register/register.command'
import { RegisterHandler } from './register/register.handler'

import { LoginCommand } from './login/login.command'
import { LoginHandler } from './login/login.handler'

import { LogoutCommand } from './logout/logout.command'
import { LogoutHandler } from './logout/logout.handler'

import { GoogleLoginCommand } from './google-login/google-login.command'
import { GoogleLoginHandler } from './google-login/google-login.handler'

import { GithubLoginCommand } from './github-login/github-login.command'
import { GithubLoginHandler } from './github-login/github-login.handler'

export const AC = {
	RegisterCommand,
	LoginCommand,
	LogoutCommand,
	GoogleLoginCommand,
	GithubLoginCommand
}

export const AH = [
	RegisterHandler,
	LoginHandler,
	LogoutHandler,
	GoogleLoginHandler,
	GithubLoginHandler
]
