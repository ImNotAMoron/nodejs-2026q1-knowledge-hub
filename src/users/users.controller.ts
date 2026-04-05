import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UuidParams } from '../common/params/uuid.params';

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
  findAll() {
    return this.usersService.findAll();
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
