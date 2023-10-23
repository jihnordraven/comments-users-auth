import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20'
import { CONFIG } from '../../config'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			clientID: CONFIG.GOOGLE_CLIENT_ID,
			clientSecret: CONFIG.GOOGLE_CLIENT_SECRET,
			callbackURL: `${CONFIG.HOST}/api/v1/auth/google/callback`,
			scope: ['profile', 'email']
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: VerifyCallback
	): Promise<any> {
		done(null, accessToken)
	}
}
