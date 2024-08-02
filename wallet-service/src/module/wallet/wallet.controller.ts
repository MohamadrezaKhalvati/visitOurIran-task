import { Controller } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'
import { CreateWalletInput } from './dto/create-wallet.input'
import { DecreaseBalanceInput } from './dto/decrease-balance.input'
import { IncreaseBalanceInput } from './dto/increase-balance.input'
import { readWalletInput } from './dto/read-wallet.input'
import { UpdateWalletInput } from './dto/update-wallet.input'
import { WalletService } from './wallet.service'

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}

    @EventPattern('create_wallet')
    async createWalllet(@Payload() input: CreateWalletInput) {
        await this.walletService.createWallet(input)
    }

    @MessagePattern({ cmd: 'read_wallet' })
    async readWallet(@Payload() input: readWalletInput) {
        return await this.walletService.readWallet(input)
    }

    @EventPattern('update_wallet')
    async updateWallet(@Payload() input: UpdateWalletInput) {
        await this.walletService.updateWallet(input)
    }

    @EventPattern('increase-balance')
    async increaseBalance(@Payload() input: IncreaseBalanceInput) {
        return await this.walletService.increaseBalance(input)
    }

    @EventPattern('decrease-balance')
    async decreaseBalance(@Payload() input: DecreaseBalanceInput) {
        return await this.walletService.decreaseBalance(input)
    }
}
