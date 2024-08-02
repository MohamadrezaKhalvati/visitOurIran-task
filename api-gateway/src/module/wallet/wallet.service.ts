import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { DecreaseBalanceInput } from './dto/decrease-balance.input'
import { IncreaseBalanceInput } from './dto/increase-balance.input'

@Injectable()
export class WalletService {
    constructor(
        @Inject('WALLET_SERIVCE') private readonly wallletApp: ClientProxy,
    ) {}

    async increaseBalance(input: IncreaseBalanceInput) {
        const pattern = 'increase-balance'
        await this.wallletApp.emit(pattern, input)
    }

    async decreaseBalance(input: DecreaseBalanceInput) {
        const pattern = 'decrease-balance'
        await this.wallletApp.emit(pattern, input)
    }
}
