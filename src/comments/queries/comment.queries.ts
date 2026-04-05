import { IsUUID } from 'class-validator';

export class CommentQueries {
  @IsUUID()
  articleId: string;
}
