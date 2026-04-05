import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueries } from '../../common/queries/pagination.queries';
import { CommentQueries } from './comment.queries';

export class AllCommentsPaginateQueries extends IntersectionType(
  CommentQueries,
  PaginationQueries,
) {}
