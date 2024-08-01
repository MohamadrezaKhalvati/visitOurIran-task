import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserInput } from './dto/create-user.input'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('create')
    @ApiOperation({ summary: 'Create user', operationId: 'CreateUser' })
    @ApiBody({ type: CreateUserInput })
    @ApiResponse({ status: 201 })
    async createUser(@Body() input: CreateUserInput) {
        return await this.userService.createUser(input)
    }

    @Get('readUser')
    @ApiOperation({ summary: 'Read user', operationId: 'ReadUser' })
    @ApiResponse({ status: 200 })
    async readUser() {
        return await this.userService.readUsers()
    }
}
