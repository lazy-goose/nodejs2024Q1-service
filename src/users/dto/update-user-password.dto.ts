import { IsNotEmpty, IsString } from 'class-validator-stable';
import { IsPassword } from 'src/utils/validators-extended';

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsPassword()
  newPassword: string;
}
