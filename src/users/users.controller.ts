import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserPasswordDto } from 'src/users/dto/update-user-password.dto';
import { ID } from 'src/database/types/models';
import { UUIDParam } from 'src/utils/uuid';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@UUIDParam('id') id: ID) {
    return this.usersService.findOne(id);
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
