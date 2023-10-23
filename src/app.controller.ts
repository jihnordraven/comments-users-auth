import {
	BadRequestException,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	InternalServerErrorException
} from '@nestjs/common'
import { Public } from './utils/decorators'
import { ConfigService } from '@nestjs/config'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { HelloPageTemplate } from '../static/templates'

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

	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'test bad request' })
	@Get('badRequest')
	@HttpCode(HttpStatus.BAD_REQUEST)
	public badRequest(): void {
		throw new BadRequestException()
	}

	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'test internal server exception'
	})
	@Get('internalServerException')
	@HttpCode(HttpStatus.INTERNAL_SERVER_ERROR)
	public internalServerException() {
		throw new InternalServerErrorException()
	}
}
