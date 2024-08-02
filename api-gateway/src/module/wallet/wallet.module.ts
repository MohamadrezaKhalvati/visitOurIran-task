import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { WalletController } from './wallet.controller'
import { WalletService } from './wallet.service'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'WALLET_SERIVCE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL],
                    queue: process.env.WALLET_QUEUE,
                    queueOptions: {
                        durable: false,
                    },
                },
            },
        ]),
    ],
    controllers: [WalletController],
    providers: [WalletService],
})
export class WalletModule {}
