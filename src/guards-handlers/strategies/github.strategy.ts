import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { CONFIG } from 'src/config'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor() {
		super({
			clientID: CONFIG.GITHUB_CLIENT_ID,
			clientSecret: CONFIG.GITHUB_CLIENT_SECRET,
			callbackUrl: `${CONFIG.HOST}/api/v1/auth/github/callback`
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: any,
		done: Function
	) {
		done(null, accessToken)
	}
}
