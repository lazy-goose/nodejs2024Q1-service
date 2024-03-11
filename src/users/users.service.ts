import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserPasswordDto } from 'src/users/dto/update-user-password.dto';
import { ID } from 'src/database/types/models';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  getAll() {
    return this.database.usersService.getAll();
  }

  getOneById(id: ID) {
    return this.database.usersService.getOneById(id);
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
