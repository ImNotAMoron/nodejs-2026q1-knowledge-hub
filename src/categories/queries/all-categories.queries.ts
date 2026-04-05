import { IntersectionType } from '@nestjs/swagger';
import { SortQueries } from '../../common/queries/sort.queries';

export class AllCategoriesQueries extends IntersectionType(SortQueries) {}
