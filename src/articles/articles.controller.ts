import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { AllArticlesQueries } from './queries/all-articles.queries';
import { UuidParams } from '../common/params/uuid.params';

@Controller('article')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll(@Query() queries: AllArticlesQueries) {
    return this.articlesService.findAll(queries);
  }

  @Get(':id')
  findOne(@Param() params: UuidParams) {
    return this.articlesService.findOne(params.id);
  }

  @Put(':id')
  put(@Param() params: UuidParams, @Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.put(params.id, createArticleDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: UuidParams) {
    return this.articlesService.remove(params.id);
  }
}
