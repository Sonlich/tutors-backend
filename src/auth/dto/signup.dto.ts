import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
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

  @ApiProperty({ default: 'example1@gmail.com' })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @ApiProperty({ default: 'SomePass123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
