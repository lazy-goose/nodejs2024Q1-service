import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { ID } from 'src/database/types/Types';
import { UpdateUserPasswordDto } from 'src/users/dto/update-user-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async findAll() {
    return this.database.usersService.findAll();
  }

  async findOne(id: ID) {
    return this.database.usersService.findOne(id);
  }

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.database.usersService.create(createUserDto);
  }

  async updatePassword(id: ID, updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.database.usersService.updatePassword(id, updateUserPasswordDto);
  }

  async delete(id: ID) {
    return this.database.usersService.delete(id);
  }
}
