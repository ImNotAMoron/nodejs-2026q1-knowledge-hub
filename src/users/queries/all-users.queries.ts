import { IntersectionType } from '@nestjs/swagger';
import { SortQueries } from '../../common/queries/sort.queries';

export class AllUsersQueries extends IntersectionType(SortQueries) {}
