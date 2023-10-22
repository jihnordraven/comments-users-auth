import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import { UserResponse } from '@users/core/responses'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class UsersQueryRepo {
	constructor(private readonly prisma: PrismaService) {}

	public async findOne(id: string): Promise<User | null> {
		const user: User | null = await this.prisma.user.findUnique({ where: { id } })
		if (!user) {
			throw new NotFoundException('User not found')
		}

		return new UserResponse(user)
	}

	// public async findMany() {}
}
