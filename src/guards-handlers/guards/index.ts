import { GithubGuard } from './github.guard'
import { GoogleGuard } from './google.guard'
import { JwtAccessGuard } from './jwt-access.guard'
import { JwtGqlGuard } from './jwt-gql.guard'
import { JwtRefreshGuard } from './jwt-refresh.guard'
import { LocalGuard } from './local.guard'

export const GUARDS = {
	LocalGuard,
	JwtAccessGuard,
	JwtRefreshGuard,
	JwtGqlGuard,
	GoogleGuard,
	GithubGuard
}
