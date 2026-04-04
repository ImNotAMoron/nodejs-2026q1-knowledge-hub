import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserIdParams } from './params/user-id.params';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: UserIdParams) {
    return this.usersService.findOne(params.id);
  }

  @Put(':id')
  updatePassword(
    @Param() params: UserIdParams,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(params.id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param() params: UserIdParams) {
    return this.usersService.remove(params.id);
  }
}
