import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from 'src/utils/decorators'

@Public()
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signUp')
	@HttpCode(HttpStatus.NO_CONTENT)
	public async signUp(): Promise<void> {}

	@Post('signIn')
	@HttpCode(HttpStatus.OK)
	public async signIn() {}
}
