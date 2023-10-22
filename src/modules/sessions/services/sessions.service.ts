import { Injectable } from '@nestjs/common'
import { SessionsRepo } from '../repositories/sessions.repo'
import { Session } from '@prisma/client'

@Injectable()
export class SessionsService {
	constructor(private readonly sessionsRepo: SessionsRepo) {}

	public async validate(id: string): Promise<Session | null> {
		if (!id) return null

		const session: Session | null = await this.sessionsRepo.findById(id)
		if (!session) return null

		const isSessionExpired: boolean = new Date() > new Date(session.expiresIn)
		if (isSessionExpired) return null

		return session
	}
}
