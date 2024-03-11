import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ID } from 'src/database/types/models';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserPasswordDto } from 'src/users/dto/update-user-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  findAll() {
    return this.database.usersService.findAll();
  }

  findOne(id: ID) {
    return this.database.usersService.findOne(id);
  }

  create(createUserDto: CreateUserDto) {
    return this.database.usersService.create(createUserDto);
  }

  updatePassword(id: ID, updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.database.usersService.updatePassword(id, updateUserPasswordDto);
  }

  delete(id: ID) {
    return this.database.usersService.delete(id);
  }
}
