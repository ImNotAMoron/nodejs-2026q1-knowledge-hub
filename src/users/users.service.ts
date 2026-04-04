import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  users: User[] = [];
  create(createUserDto: CreateUserDto) {
    const role = createUserDto.role;
    const index = this.users.push({
      id: crypto.randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      role: role ?? 'viewer',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return this.users[index - 1];
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) return this.users[index];
    throw new HttpException(
      `User with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.findOne(id);
    if (user.password !== updatePasswordDto.oldPassword)
      throw new HttpException(`oldPassword is wrong`, HttpStatus.FORBIDDEN);
    user.password = updatePasswordDto.newPassword;
    return user;
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) this.users.splice(index, 1);
    else
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
  }
}
