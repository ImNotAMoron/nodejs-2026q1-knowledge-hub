import { ArticleStatus } from '../enums/article.status';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(ArticleStatus)
  status?: ArticleStatus;

  @IsOptional()
  @IsString()
  authorId?: string | null;

  @IsOptional()
  @IsString()
  categoryId?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
