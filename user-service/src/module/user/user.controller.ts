import { Controller } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern('create_user')
    async createUser(@Payload() input: CreateUserInput) {
        return await this.userService.createUser(input)
    }

    @MessagePattern({ cmd: 'read_user' })
    async readUsers() {
        return await this.userService.readUser()
    }

    @EventPattern({ cmd: 'update_user' })
    async updateUser(@Payload() input: UpdateUserInput) {
        await this.userService.updateUser(input)
    }
}
