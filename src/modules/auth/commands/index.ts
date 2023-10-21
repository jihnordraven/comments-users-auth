import { RegisterCommand } from './register/register.command'
import { RegisterHandler } from './register/register.handler'

import { LoginCommand } from './login/login.command'
import { LoginHandler } from './login/login.handler'

import { LogoutCommand } from './logout/logout.command'
import { LogoutHandler } from './logout/logout.handler'

export const AC = { RegisterCommand, LoginCommand, LogoutCommand }

export const AH = [RegisterHandler, LoginHandler, LogoutHandler]
