import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
    private readonly userSelectedData = {
        id: true,
        username: true,
        lastName: true,
        firstName: true,
        gender: true,
    }
    constructor(private prisma: PrismaService) {}

    async createUser(input: CreateUserInput) {
        const { username } = input
        const user = await this.prisma.user.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                username: username,
                gender: input.gender,
            },
            select: this.userSelectedData,
        })
        return user
    }

    async readUser() {
        return await this.prisma.user.findMany()
    }

    async updateUser(input: UpdateUserInput) {
        await this.prisma.user.update({
            where: {
                id: input.id,
            },
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                gender: input.gender,
                username: input.username,
            },
            select: this.userSelectedData,
        })
    }
}
