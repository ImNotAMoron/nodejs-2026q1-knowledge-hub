import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;
  @IsString()
  password: string;

  @IsOptional()
  @IsIn(['admin', 'editor', 'viewer'])
  role?: 'admin' | 'editor' | 'viewer'; // defaults to 'viewer'
}
