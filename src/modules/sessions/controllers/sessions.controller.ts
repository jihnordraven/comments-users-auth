import { Controller } from '@nestjs/common'
import { SessionsService } from '../services/sessions.service'

@Controller('sessions')
export class SessionsController {
	constructor(private readonly sessionsService: SessionsService) {}
}
