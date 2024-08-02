import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DecreaseBalanceInput } from './dto/decrease-balance.input'
import { IncreaseBalanceInput } from './dto/increase-balance.input'
import { WalletService } from './wallet.service'

@Controller('wallet')
@ApiTags('wallet')
export class WalletController {
    constructor(private walletService: WalletService) {}

    @Post('increaseBalance')
    @ApiOperation({
        summary: 'Increase Balance',
        operationId: 'increaseBalance',
    })
    @ApiBody({ type: IncreaseBalanceInput })
    @ApiResponse({ status: 200 })
    async increaseBalance(@Body() input: IncreaseBalanceInput) {
        return await this.walletService.increaseBalance(input)
    }

    @Post('decreaseBalance')
    @ApiOperation({
        summary: 'Decrease Balance',
        operationId: 'decreaseBalance',
    })
    @ApiBody({ type: DecreaseBalanceInput })
    @ApiResponse({ status: 200 })
    async decreaseBalance(@Body() input: DecreaseBalanceInput) {
        return await this.walletService.decreaseBalance(input)
    }
}
