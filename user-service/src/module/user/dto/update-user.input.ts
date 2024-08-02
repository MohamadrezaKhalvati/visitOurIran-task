import { Gender } from '@prisma/client'
import {
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
	MaxLength,
	MinLength,
} from 'class-validator'

export class UpdateUserInput {
    @IsUUID()
    id: string

    @IsOptional()
    @MinLength(5)
    @MaxLength(20)
    username?: string

    @IsOptional()
    firstName?: string

    @IsOptional()
    @IsString()
    lastName?: string

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender
}
