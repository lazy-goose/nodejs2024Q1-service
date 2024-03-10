import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/database/services/dto/users/create-user.dto';
import { UpdateUserPasswordDto } from 'src/database/services/dto/users/update-user-password.dto';
import { ID } from 'src/database/types/models';
import { UUIDParam } from 'src/utils/uuid';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOneById(@UUIDParam('id') id: ID) {
    return this.usersService.getOneById(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  updatePassword(
    @UUIDParam('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updatePassword(id, updateUserPasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@UUIDParam('id') id: string) {
    return this.usersService.delete(id);
  }
}
