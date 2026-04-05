import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRole } from './enums/user.role';
import { ArticlesService } from '../articles/articles.service';
import { CommentsService } from '../comments/comments.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly commentsService: CommentsService,
  ) {}
  users: User[] = [];
  create(createUserDto: CreateUserDto) {
    const role = createUserDto.role;
    const newUser = new User({
      id: crypto.randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      role: role ?? UserRole.VIEWER,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    this.users.push(newUser);
    return newUser;
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
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      const authorId = this.users[index].id;
      this.users.splice(index, 1);
      this.articlesService.clearAuthorId(authorId);
      this.commentsService.removeByAuthorId(authorId);
    } else
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
  }
}
