import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { generateUUID } from 'src/utils/uuid';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserPasswordDto } from '../../users/dto/update-user-password.dto';
import DatabaseService from '../types/DatabaseService';
import { ID, User } from '../types/models';

@Injectable()
export class UsersDatabaseService implements DatabaseService {
  private users: User[] = [];

  findAll() {
    return this.users.map(this.omitPassword);
  }

  private findOneWithPassword(id: ID) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private omitPassword(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...fields } = user;
    return fields;
  }

  findOne(id: ID) {
    const user = this.findOneWithPassword(id);
    return this.omitPassword(user);
  }

  create(createUserDto: CreateUserDto) {
    const createDate = Date.now();
    const newUser = {
      id: generateUUID(),
      version: 1,
      createdAt: createDate,
      updatedAt: createDate,
      ...createUserDto,
    };
    this.users.push(newUser);
    return this.omitPassword(newUser);
  }

  updatePassword(id: ID, updateUserPasswordDto: UpdateUserPasswordDto) {
    const currentUser = this.findOneWithPassword(id);
    const { oldPassword, newPassword } = updateUserPasswordDto;
    if (currentUser.password !== oldPassword) {
      throw new ForbiddenException('Wrong user password');
    }
    currentUser.password = newPassword;
    currentUser.version++;
    currentUser.updatedAt = Date.now();
    return this.omitPassword(currentUser);
  }

  delete(id: ID) {
    const currentUser = this.findOneWithPassword(id);
    this.users = this.users.filter((u) => u.id !== id);
    return this.omitPassword(currentUser);
  }
}
