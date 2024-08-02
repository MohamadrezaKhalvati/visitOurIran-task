import {
	BadRequestException,
	CACHE_MANAGER,
	Inject,
	Injectable,
} from '@nestjs/common'
import { Cache } from 'cache-manager'
import { PrismaService } from '../prisma/prisma.service'
import { CreateWalletInput } from './dto/create-wallet.input'
import { DecreaseBalanceInput } from './dto/decrease-balance.input'
import { IncreaseBalanceInput } from './dto/increase-balance.input'
import { readWalletInput } from './dto/read-wallet.input'
import { UpdateWalletInput } from './dto/update-wallet.input'
@Injectable()
export class WalletService {
    constructor(
        private prisma: PrismaService,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) {}

    async createWallet(input: CreateWalletInput) {
        const { userId } = input
        await this.verifyUserIdISUnique(userId)
        await this.prisma.wallet.create({
            data: {
                amount: 0,
                userId: userId,
            },
        })
    }

    async readWallet(input: readWalletInput) {
        const wallet = await this.prisma.wallet.findMany({
            where: {
                userId: {
                    in: input.userId,
                },
            },
        })
        return wallet
    }

    async updateWallet(input: UpdateWalletInput) {
        await this.prisma.wallet.update({
            where: {
                userId: input.userId,
            },
            data: {
                amount: input.amount,
            },
        })
    }

    private async getUserBalance(userId: string) {
        const balance = await this.cacheService.get(`user-balance:${userId}`)
        return balance ? parseFloat(balance.toString()) : 0
    }

    private async setUserBalance(userId: string, balance: number) {
        await this.cacheService.set(
            `user-balance:${userId}`,
            balance.toString(),
        )
    }

    async increaseBalance(input: IncreaseBalanceInput) {
        const { amount, userId } = input
        const currentBalance = await this.getUserBalance(userId)
        const newBalance = currentBalance + amount
        await this.prisma.wallet.update({
            where: {
                userId: input.userId,
            },
            data: {
                amount: newBalance,
            },
        })
        await this.setUserBalance(userId, newBalance)
    }

    async decreaseBalance(input: DecreaseBalanceInput) {
        const { amount, userId } = input
        const currentBalance = await this.getUserBalance(userId)
        if (currentBalance >= amount) {
            const newBalance = currentBalance - amount
            await this.prisma.wallet.update({
                where: {
                    userId: input.userId,
                },
                data: {
                    amount: newBalance,
                },
            })
            await this.setUserBalance(userId, newBalance)
        } else {
            throw new BadRequestException('Insufficient balance')
        }
    }

    private async verifyUserIdISUnique(userId: string) {
        const wallet = this.prisma.wallet.findUnique({
            where: {
                userId: userId,
            },
        })

        if (wallet) {
            throw new BadRequestException('User has already wallet!')
        }
    }
}
