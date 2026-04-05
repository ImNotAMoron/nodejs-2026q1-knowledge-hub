import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQueries } from './queries/comment.queries';
import { UuidParams } from '../common/params/uuid.params';

@Controller('comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll(@Query() commentQueries: CommentQueries) {
    return this.commentsService.findByArticleId(commentQueries.articleId);
  }

  @Get(':id')
  findOne(@Param() params: UuidParams) {
    return this.commentsService.findOne(params.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param() params: UuidParams) {
    return this.commentsService.remove(params.id);
  }
}
