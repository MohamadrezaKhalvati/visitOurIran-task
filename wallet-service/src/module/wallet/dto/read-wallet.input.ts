import { IsArray } from 'class-validator'

export class readWalletInput {
    @IsArray()
    userId: string[]
}
