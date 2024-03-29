import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'src/common/utils/class-validator-extended';

export class CreateUserDto implements Pick<User, 'login' | 'password'> {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsPassword()
  password: string;
}
