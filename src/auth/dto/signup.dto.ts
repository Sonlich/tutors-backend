import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../../users/interfaces/roles.enum';
import { CreateSubjectDto } from '../../subjects/dto/create-subject.dto';
import { Type } from 'class-transformer';
import { Binary } from 'typeorm';

export class SignUpDto {
  @ApiProperty({ default: 'Sonya' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ default: 'Zaika' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsOptional()
  profilePhoto?: string;

  @ApiProperty({ default: new Date().toString() })
  @IsNotEmpty()
  @IsString()
  birthDate: Date;

  @ApiProperty({ default: 'some description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ default: 'example1@gmail.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty({ default: RolesEnum.Tutor })
  @IsNotEmpty()
  @IsEnum(RolesEnum, { message: 'Role must be either Tutor or Student' })
  role: RolesEnum;

  @ApiProperty({ default: 'SomePass123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubjectDto)
  subjects: CreateSubjectDto[];
}
