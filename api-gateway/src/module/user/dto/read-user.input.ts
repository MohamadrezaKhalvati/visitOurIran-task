import { ApiProperty } from '@nestjs/swagger'

export class ReadUserInput {
    @ApiProperty()
    id: string
}
