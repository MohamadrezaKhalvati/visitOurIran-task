import { IsString, IsUUID } from 'class-validator'

export class ReadUserInput {
    @IsString()
    @IsUUID()
    id: string
}
