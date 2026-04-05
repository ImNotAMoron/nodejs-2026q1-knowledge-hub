import { IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueries {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number;
}
