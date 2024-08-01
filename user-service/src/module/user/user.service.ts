import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserInput } from './dto/create-user.input'

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
        // await this.verifyIfUserNameUnique(username)
        console.log(username)
        const user = await this.prisma.user.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                username: username,
                gender: input.gender,
            },
            select: this.userSelectedData,
        })
        return { message: 'User created successfully', status: 201 }
    }

    // async verifyIfUserNameUnique(username: string) {
    //     const user = await this.prisma.user.findFirst({
    //         where: {
    //             username: username,
    //         },
    //     })

    //     if (user) {
    //         throw new BadRequestException('Username is already exist!')
    //     }
    // }

    async readUser() {
        return await this.prisma.user.findMany()
    }
}
