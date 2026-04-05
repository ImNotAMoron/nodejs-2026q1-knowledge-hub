import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { ArticlesService } from '../articles/articles.service';
import { CommentQueries } from './queries/comment.queries';
import { sort } from '../common/utils/sort';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(forwardRef(() => ArticlesService))
    private readonly articlesService: ArticlesService,
  ) {}
  private comments: Comment[] = [];
  create(createCommentDto: CreateCommentDto) {
    const isArticleExist = this.articlesService.has(createCommentDto.articleId);
    if (!isArticleExist)
      throw new HttpException(
        `Article ${createCommentDto.articleId} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const comment = new Comment({
      id: crypto.randomUUID(),
      content: createCommentDto.content,
      articleId: createCommentDto.articleId,
      authorId: createCommentDto.authorId ?? null,
      createdAt: Date.now(),
    });
    this.comments.push(comment);
    return comment;
  }

  remove(id: string) {
    const index = this.comments.findIndex((comment) => comment.id === id);
    if (index === -1)
      throw new HttpException(
        `Comment ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    this.comments.splice(index, 1);
  }

  findByArticleId(commentQueries: CommentQueries) {
    const { articleId, sortBy, order } = commentQueries;
    const filtered = this.comments.filter((el) => el.articleId === articleId);
    if (sortBy && order) {
      return sort(filtered, sortBy, order);
    }
    return filtered;
  }

  removeByAuthorId(authorId: string) {
    this.comments = this.comments.filter(
      (comment) => comment.authorId !== authorId,
    );
  }

  removeByArticleId(articleId: string) {
    this.comments = this.comments.filter(
      (comment) => comment.articleId !== articleId,
    );
  }

  findOne(id: string) {
    const index = this.comments.findIndex((comments) => comments.id === id);
    if (index > -1) return this.comments[index];
    throw new HttpException(
      `Comment ${id} does not exist`,
      HttpStatus.NOT_FOUND,
    );
  }
}
