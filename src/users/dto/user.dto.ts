import {
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsString,
  IsArray,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../interfaces/roles.enum';

export class CreateUserDto {
  @ApiProperty({ default: 'Sonya' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ default: 'Zaika' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  photo: string;

  @ApiProperty({ default: new Date().toString() })
  @IsNotEmpty()
  @IsString()
  birthDate: Date;

  @ApiProperty({ default: 'some description' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ default: 'example@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: '123456' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  public readonly roles?: RolesEnum[];
}
