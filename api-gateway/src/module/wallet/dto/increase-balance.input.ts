import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsUUID } from 'class-validator'

export class IncreaseBalanceInput {
    @ApiProperty()
    @IsUUID()
    userId: string

    @ApiProperty()
    @IsNumber()
    amount: number
}
