import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CreateUserInput } from './dto/create-user.input'

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_SERIVCE') private readonly userApp: ClientProxy,
    ) {}

    async createUser(input: CreateUserInput) {
        const pattern = 'create_user'

        await this.userApp.send(pattern, input)
        // await this.
    }

    async readUsers() {
        const userPattern = 'read_user'
        const users = await this.userApp.send({ cmd: userPattern }, {})

        return users
    }
}
