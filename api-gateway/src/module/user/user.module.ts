import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USER_SERIVCE',
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RABBITMQ_URL],
                    queue: process.env.USER_QUEUE,
                    queueOptions: {
                        durable: false,
                    },
                },
            },
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
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
