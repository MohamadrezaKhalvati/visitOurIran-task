import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateWalletInput } from './dto/create-wallet.input'

@Injectable()
export class WalletService {
    constructor(private prisma: PrismaService) {}

    async createWallet(input: CreateWalletInput) {
        const { userId } = input
        const wallet = await this.prisma.wallet.create({
            data: {
                amount: 0,
                userId: userId,
            },
        })
    }
}
