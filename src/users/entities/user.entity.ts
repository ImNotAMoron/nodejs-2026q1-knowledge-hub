import { UserRole } from '../enums/user.role';
import { Exclude } from 'class-transformer';

export class User {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  role: UserRole;
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor(user: User) {
    Object.assign(this, user);
  }
}
