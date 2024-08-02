import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator'
import { Gender } from 'src/common/inputField'

export class CreateUserInput {
    @ApiProperty()
    @MinLength(5)
    @MaxLength(20)
    @IsString()
    username: string

    @ApiProperty()
    @IsString()
    firstName: string

    @ApiProperty()
    @IsString()
    lastName: string

    @ApiProperty()
    @IsEnum(Gender)
    gender: Gender
}
