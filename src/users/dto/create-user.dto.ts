import { IsNotEmpty, IsString } from 'class-validator-stable';
import { User } from 'src/database/types/models';
import { IsPassword } from 'src/utils/validators-extended';

export class CreateUserDto implements Pick<User, 'login' | 'password'> {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsPassword()
  password: string;
}
