import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { CreateUserInput } from './dto/create-user.input'
import { CreateWalletInput } from './dto/create-wallet.input'
import { readWalletInput } from './dto/read-wallet.input'
import { UpdateUserInput } from './dto/update-user.input'

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_SERIVCE') private readonly userApp: ClientProxy,
        @Inject('WALLET_SERIVCE') private readonly wallletApp: ClientProxy,
    ) {}

    async createUser(input: CreateUserInput) {
        const createUserPattern = 'create_user'
        const createWalletPattern = 'create_wallet'
        const user = await this.userApp
            .send(createUserPattern, input)
            .toPromise()

        const createWalletPayload: CreateWalletInput = {
            userId: user.id,
        }

        await this.wallletApp
            .send(createWalletPattern, createWalletPayload)
            .toPromise()

        return {
            message: 'User and Wallet created successfully',
        }
    }

    async readUsers() {
        const readUserPattern = 'read_user'
        const readWalletPattern = 'read_wallet'

        const users = await this.userApp
            .send({ cmd: readUserPattern }, {})
            .toPromise()
        const userIds = users.map(user => user.id)
        const readWalletInput: readWalletInput = {
            userId: userIds,
        }
        const wallets = await this.wallletApp
            .send({ cmd: readWalletPattern }, readWalletInput)
            .toPromise()

        const result = users.map(user => {
            const wallet = wallets.find(wallet => wallet.userId === user.id)

            return {
                ...user,
                amount: wallet.amount,
            }
        })
        return result
    }

    async updateUser(input: UpdateUserInput) {
        const updateUserPattern = 'update_user'
        const updateWalletPattern = 'update_wallet'
        const filteredData = await this.filterObject(input)
        await this.userApp.emit({ cmd: updateUserPattern }, filteredData)
        if (filteredData.amount) {
            await this.wallletApp.emit(updateWalletPattern, {
                userId: filteredData.id,
                amount: filteredData.amount,
            })
        }

        return {
            message: 'User updated successfully',
        }
    }

    private async filterObject(obj: UpdateUserInput) {
        const result: any = {}
        Object.keys(obj).forEach(key => {
            const value = obj[key]
            if (
                value !== undefined &&
                value !== null &&
                value !== '' &&
                !(typeof value === 'number' && value < 0)
            ) {
                result[key] = value
            }
        })
        return result
    }
}
