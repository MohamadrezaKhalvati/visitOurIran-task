import { Module } from '@nestjs/common'
import { UserModule } from './module/user/user.module'
import { WalletModule } from './module/wallet/wallet.module'
@Module({
    imports: [UserModule, WalletModule],
    providers: [],
})
export class AppModule {}
