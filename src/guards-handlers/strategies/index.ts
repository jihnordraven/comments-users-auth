import { JwtAccessStrategy } from './jwt-access.strategy'
import { JwtGqlStrategy } from './jwt-gql.strategy'
import { JwtRefreshStrategy } from './jwt-refresh.strategy'
import { LocalStrategy } from './local.strategy'

export const STRATEGIES = [
	LocalStrategy,
	JwtAccessStrategy,
	JwtRefreshStrategy,
	JwtGqlStrategy
]
