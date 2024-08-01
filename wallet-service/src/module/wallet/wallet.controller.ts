import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { CreateWalletInput } from './dto/create-wallet.input'
import { WalletService } from './wallet.service'

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}

    @EventPattern('createWallet')
    async createWalllet(@Payload() input: CreateWalletInput) {
        return await this.walletService.createWallet(input)
    }
}
