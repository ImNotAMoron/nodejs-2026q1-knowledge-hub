import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import { ArticleStatus } from './enums/article.status';
import { AllArticlesQueries } from './queries/all-articles.queries';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class ArticlesService {
  constructor(
    @Inject(forwardRef(() => CommentsService))
    private readonly commentsService: CommentsService,
  ) {}

  private articles: Article[] = [];
  create(createArticleDto: CreateArticleDto) {
    const article = {
      id: crypto.randomUUID(),
      title: createArticleDto.title,
      content: createArticleDto.content,
      status: createArticleDto.status ?? ArticleStatus.DRAFT,
      authorId: createArticleDto.authorId ?? null,
      categoryId: createArticleDto.categoryId ?? null,
      tags: createArticleDto.tags ?? [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.articles.push(article);
    return article;
  }

  put(id: string, createArticleDto: CreateArticleDto) {
    const index = this.findIndex(id);

    const article = {
      id: id,
      title: createArticleDto.title,
      content: createArticleDto.content,
      status: createArticleDto.status ?? ArticleStatus.DRAFT,
      authorId: createArticleDto.authorId ?? null,
      categoryId: createArticleDto.categoryId ?? null,
      tags: createArticleDto.tags ?? [],
      createdAt: this.articles[index].createdAt,
      updatedAt: Date.now(),
    };

    this.articles[index] = article;
    return article;
  }

  findAll(allArticlesQueries: AllArticlesQueries) {
    console.log(allArticlesQueries);
    const { tag, status, categoryId } = allArticlesQueries;
    return this.articles.filter((article) => {
      if (tag && !article.tags.includes(tag)) return false;
      else if (status && article.status !== status) return false;
      else return !(categoryId && article.categoryId !== categoryId);
    });
  }

  findOne(id: string) {
    const index = this.findIndex(id);
    return this.articles[index];
  }

  remove(id: string) {
    const index = this.findIndex(id);
    const articleId = this.articles[index].id;
    this.commentsService.removeByArticleId(articleId);
    this.articles.splice(index, 1);
  }

  findIndex(id: string) {
    const index = this.articles.findIndex((article) => article.id === id);
    if (index >= 0) return index;
    throw new HttpException(
      `Article with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  has(id: string) {
    const index = this.articles.findIndex((article) => article.id === id);
    return index >= 0;
  }

  clearAuthorId(authorId: string) {
    const articles = this.articles.filter(
      (article) => article.authorId === authorId,
    );
    for (const article of articles) {
      article.authorId = null;
    }
  }
  clearCategoryId(categoryId: string) {
    const articles = this.articles.filter(
      (article) => article.categoryId === categoryId,
    );
    for (const article of articles) {
      article.categoryId = null;
    }
  }
}
