import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class UserRegister {
  @ApiProperty()
  @IsNotEmpty()
  profile_id: number;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  expiration_date?: Date;

  @ApiPropertyOptional()
  theme?: string;

  @ApiPropertyOptional()
  photo?: string;
}