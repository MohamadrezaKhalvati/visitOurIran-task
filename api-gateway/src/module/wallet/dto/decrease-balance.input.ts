import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsUUID } from 'class-validator'

export class DecreaseBalanceInput {
    @ApiProperty()
    @IsUUID()
    userId: string

    @ApiProperty()
    @IsNumber()
    amount: number
}
