import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { WalletService } from './wallet.service'

@Controller('wallet')
@ApiTags('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}
}
