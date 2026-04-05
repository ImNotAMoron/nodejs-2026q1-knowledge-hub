import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { ArticlesService } from '../articles/articles.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly articlesService: ArticlesService) {}

  categories: Category[] = [];
  create(createCategoryDto: CreateCategoryDto) {
    const category = {
      id: crypto.randomUUID(),
      ...createCategoryDto,
    };
    this.categories.push(category);
    return category;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: string) {
    return this.categories[this.findIndex(id)];
  }

  put(id: string, createCategoryDto: CreateCategoryDto) {
    const index = this.findIndex(id);
    const category = {
      id: this.categories[index].id,
      ...createCategoryDto,
    };
    this.categories[index] = category;
    return category;
  }

  remove(id: string) {
    const index = this.findIndex(id);
    this.articlesService.clearCategoryId(id);
    this.categories.splice(index, 1);
  }

  findIndex(id: string) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index >= 0) return index;
    throw new HttpException(
      `Category with id ${id} does not exist`,
      HttpStatus.NOT_FOUND,
    );
  }
}
