import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'

const logger = new Logger()

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RABBITMQ_URL],
                queue: process.env.RABBITMQ_QUEUE,
                queueOptions: {
                    durable: false,
                },
            },
        },
    )
    logger.log('Microservice User is listening')
    app.listen()
}
bootstrap()
