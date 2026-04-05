import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UuidParams } from '../common/params/uuid.params';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
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
