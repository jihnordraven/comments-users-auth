import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { Public } from './utils/decorators'
import { ConfigService } from '@nestjs/config'
import { HelloPageTemplate } from 'static/templates'
import { ApiTags } from '@nestjs/swagger'

@Public()
@ApiTags('Api Controller')
@Controller()
export class AppController {
	constructor(private readonly config: ConfigService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	public status(): string {
		return HelloPageTemplate({ HOST: this.config.getOrThrow<string>('HOST') })
	}
}
