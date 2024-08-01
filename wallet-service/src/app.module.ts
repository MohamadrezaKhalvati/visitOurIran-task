import { Module } from '@nestjs/common'
import { PrismaModule } from './module/prisma/prisma.module'
import { WalletModule } from './module/wallet/wallet.module'

@Module({
    imports: [PrismaModule, WalletModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
