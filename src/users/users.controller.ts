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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UuidParams } from '../common/params/uuid.params';
import { AllUsersQueries } from './queries/all-users.queries';
import { AllUsersPaginateQueries } from './queries/all-users-paginate.queries';
import { paginate } from '../common/utils/paginate';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() queries: AllUsersQueries) {
    return this.usersService.findAll(queries);
  }

  @Get('/paginate')
  findAllWithPagination(@Query() queries: AllUsersPaginateQueries) {
    const result = this.usersService.findAll(queries);
    return paginate(result, queries.page, queries.limit);
  }

  @Get(':id')
  findOne(@Param() params: UuidParams) {
    return this.usersService.findOne(params.id);
  }

  @Put(':id')
  updatePassword(
    @Param() params: UuidParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(params.id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: UuidParams) {
    return this.usersService.remove(params.id);
  }
}
