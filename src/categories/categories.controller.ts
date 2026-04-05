import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UuidParams } from '../common/params/uuid.params';
import { AllCategoriesQueries } from './queries/all-categories.queries';
import { AllCategoriesPaginateQueries } from './queries/all-categories-paginate.queries';
import { paginate } from '../common/utils/paginate';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() queries: AllCategoriesQueries) {
    return this.categoriesService.findAll(queries);
  }

  @Get('/paginate')
  findAllWithPagination(@Query() queries: AllCategoriesPaginateQueries) {
    const result = this.categoriesService.findAll(queries);
    return paginate(result, queries.page, queries.limit);
  }

  @Get(':id')
  findOne(@Param() params: UuidParams) {
    return this.categoriesService.findOne(params.id);
  }

  @Put(':id')
  put(
    @Param() params: UuidParams,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.put(params.id, createCategoryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: UuidParams) {
    return this.categoriesService.remove(params.id);
  }
}
