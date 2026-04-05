import { IsOptional, IsString } from 'class-validator';

export class AllArticlesQueries {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  tag?: string;
}
