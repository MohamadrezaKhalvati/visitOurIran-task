import { IsNumber, IsUUID } from 'class-validator'

export class DecreaseBalanceInput {
    @IsUUID()
    userId: string

    @IsNumber()
    amount: number
}
