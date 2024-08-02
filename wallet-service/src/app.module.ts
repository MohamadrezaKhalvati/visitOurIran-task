import { CacheModule, Module } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'
import { PrismaModule } from './module/prisma/prisma.module'
import { WalletModule } from './module/wallet/wallet.module'
@Module({
    imports: [
        WalletModule,
        PrismaModule,
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
