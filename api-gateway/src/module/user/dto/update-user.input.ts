import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	MaxLength,
	MinLength,
} from 'class-validator'
import { Gender } from 'src/common/inputField'

export class UpdateUserInput {
    @ApiProperty()
    @IsUUID()
    id: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    username?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    firstName?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    lastName?: string

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    amount?: number
}
