import { IsNotEmpty, IsString } from 'class-validator';
import { IsPassword } from 'src/common/utils/class-validator-extended';

export class UpdateUserPasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsPassword()
  newPassword: string;
}
