import { IsEnum, IsOptional, IsString } from 'class-validator';
import { SortOrder } from '../enums/sort.order';

export class SortQueries {
  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  // @Type(() => Number)
  order?: SortOrder;
}
