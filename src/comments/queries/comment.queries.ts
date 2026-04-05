import { IsUUID } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { SortQueries } from '../../common/queries/sort.queries';

export class CommentQueries extends IntersectionType(SortQueries) {
  @IsUUID()
  articleId: string;
}
