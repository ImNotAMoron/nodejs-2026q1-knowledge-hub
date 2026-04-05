import { IsOptional, IsString } from 'class-validator';
import { PaginationQueries } from '../../common/queries/pagination.queries';
import { IntersectionType } from '@nestjs/swagger';
import { SortQueries } from '../../common/queries/sort.queries';

export class AllArticlesPaginateQueries extends IntersectionType(
  PaginationQueries,
  SortQueries,
) {
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
