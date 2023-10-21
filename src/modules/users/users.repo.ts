import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common'
import { User } from '@prisma/client'
import { Cache } from 'cache-manager'
import { PrismaService } from 'prisma/prisma.service'
import { CreateUser } from './core/types'
import { red } from 'colorette'

@Injectable()
export class UsersRepo {
	private readonly logger: Logger = new Logger(UsersRepo.name)

	constructor(
		@Inject(CACHE_MANAGER) private readonly cache: Cache,
		private readonly prisma: PrismaService
	) {}

	public async create(data: CreateUser): Promise<User> {
		const user: User | void = await this.prisma.user
			.create({
				data
			})
			.catch((err: string) => this.logger.error(red(err)))

		if (!user) throw new InternalServerErrorException('Unable to create an user')

		await this.cache.set(`user-emailOrLogin-${user.email}`, user, 1800)
		return user
	}

	public async findByEmailOrLogin(emailOrLogin: string): Promise<User | null> {
		const user: User | null = await this.cache.get(
			`user-emailOrLogin-${emailOrLogin}`
		)
		if (!user) {
			const user: User | null = await this.prisma.user.findFirst({
				where: { OR: [{ email: emailOrLogin }, { login: emailOrLogin }] }
			})
			if (!user) return null
			await this.cache.set(`user-emailOrLogin-${emailOrLogin}`, user, 1800)
			return user
		}
		return user
	}

	public async findByEmail(email: string): Promise<User | null> {
		const user: User | null = await this.cache.get(`user-email-${email}`)
		if (!user) {
			const user: User | null = await this.prisma.user.findUnique({
				where: { email }
			})
			if (!user) return null
			await this.cache.set(`user-email-${email}`, user, 1800)
			return user
		}
		return user
	}

	public async findByLogin(login: string): Promise<User | null> {
		const user: User | null = await this.cache.get(`user-login-${login}`)
		if (!user) {
			const user: User | null = await this.prisma.user.findUnique({
				where: { login }
			})
			if (!user) return null
			await this.cache.set(`user-login-${login}`, user, 1800)
			return user
		}
		return user
	}

	public async findById(id: string): Promise<User | null> {
		const user: User | null = await this.cache.get(`user-id-${id}`)
		if (!user) {
			const user: User | null = await this.prisma.user.findFirst({
				where: { id }
			})
			if (!user) return null
			await this.cache.set(`user-id-${id}`, user, 1800)
			return user
		}
		return user
	}
}
