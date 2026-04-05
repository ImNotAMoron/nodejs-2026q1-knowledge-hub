import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../enums/user.role';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiPropertyOptional({ default: 'viewer', enum: UserRole })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole; // defaults to 'viewer'
}
