import { IsNumber, IsUUID } from 'class-validator'

export class IncreaseBalanceInput {
    @IsUUID()
    userId: string

    @IsNumber()
    amount: number
}
