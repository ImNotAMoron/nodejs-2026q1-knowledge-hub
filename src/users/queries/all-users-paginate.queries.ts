import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueries } from '../../common/queries/pagination.queries';
import { SortQueries } from '../../common/queries/sort.queries';

export class AllUsersPaginateQueries extends IntersectionType(
  PaginationQueries,
  SortQueries,
) {}
