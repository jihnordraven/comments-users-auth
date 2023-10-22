import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Session } from '@prisma/client'
import { Cache } from 'cache-manager'
import { PrismaService } from '../../../../prisma/prisma.service'
import { CreateSession } from '../core/types'
import { add } from 'date-fns'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SessionsRepo {
	constructor(
		private readonly config: ConfigService,
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async create(data: CreateSession): Promise<string> {
		const isUserAgent: Session | null = await this.prisma.session.findUnique({
			where: { userAgent: data.userAgent }
		})

		const sessionId: string = isUserAgent ? isUserAgent.id : ''
		const expiresIn: Date = add(new Date(), {
			seconds: this.config.getOrThrow('JWT_REFRESH_EXPIRES')
		})

		const session: Session | void = await this.prisma.session.upsert({
			where: { id: sessionId },
			update: { expiresIn },
			create: {
				...data,
				expiresIn
			}
		})
		return session.id
	}

	public async findById(id: string): Promise<Session | null> {
		const session: Session = await this.cache.get(`session-id-${id}`)
		if (!session) {
			const session: Session | null = await this.prisma.session.findUnique({
				where: { id }
			})
			if (!session) return null
			await this.cache.set(`session-id-${id}`, session, 1800)
			return session
		}
		return session
	}

	public async deleteById(id: string): Promise<boolean> {
		const session: Session | null = await this.findById(id)
		if (!session) throw new NotFoundException('Session not found')

		return Boolean(await this.prisma.session.delete({ where: { ...session } }))
	}
}
