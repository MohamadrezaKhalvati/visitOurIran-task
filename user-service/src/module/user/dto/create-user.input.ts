import { Gender } from '@prisma/client'
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserInput {
    @MinLength(5)
    @MaxLength(20)
    @IsString()
    username: string

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsEnum(Gender)
    gender: Gender
}
