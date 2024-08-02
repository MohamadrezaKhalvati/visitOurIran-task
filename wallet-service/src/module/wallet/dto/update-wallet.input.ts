import { IsNumber, IsUUID } from 'class-validator'

export class UpdateWalletInput {
    @IsUUID()
    userId: string

    @IsNumber()
    amount: number
}
