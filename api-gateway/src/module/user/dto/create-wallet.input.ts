import { IsUUID } from 'class-validator'

export class CreateWalletInput {
    @IsUUID()
    userId: string
}
