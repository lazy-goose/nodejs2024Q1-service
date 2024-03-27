import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserPasswordDto } from '../../users/dto/update-user-password.dto';
import { PrismaService } from '../prisma/prisma.service';
import DatabaseService from '../types/DatabaseService';
import { ID } from '../types/Types';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersDatabaseService implements DatabaseService {
  constructor(private readonly prisma: PrismaService) {}

  private async findOneRaw(id: ID) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  async findAll() {
    const foundArray = await this.prisma.user.findMany();
    return foundArray.map((f) => new UserEntity(f));
  }

  async findOne(id: ID) {
    const found = await this.findOneRaw(id);
    return new UserEntity(found);
  }

  async create(createUserDto: CreateUserDto) {
    const created = await this.prisma.user.create({ data: createUserDto });
    return new UserEntity(created);
  }

  async updatePassword(id: ID, updateUserPasswordDto: UpdateUserPasswordDto) {
    const { oldPassword, newPassword } = updateUserPasswordDto;
    const current = await this.findOneRaw(id);
    if (current.password !== oldPassword) {
      throw new ForbiddenException('Wrong user password');
    }
    const updated = await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: {
          increment: 1,
        },
      },
    });
    return new UserEntity(updated);
  }

  async delete(id: ID) {
    const deleted = await this.prisma.user.delete({ where: { id } });
    return new UserEntity(deleted);
  }
}
