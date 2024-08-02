import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
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

    @Put('updateUser')
    @ApiOperation({ summary: 'Update user', operationId: 'UpdateUser' })
    @ApiResponse({ status: 200 })
    @ApiBody({ type: UpdateUserInput })
    async updateUser(@Body() input: UpdateUserInput) {
        return await this.userService.updateUser(input)
    }
}
