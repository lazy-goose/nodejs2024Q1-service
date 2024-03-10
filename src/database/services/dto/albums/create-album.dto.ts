import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID_VERSION } from 'src/constants';
import { Album, ID } from 'src/database/types/models';
import { IsNull } from 'src/utils/validators-extended';

export class CreateAlbumDto implements Omit<Album, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  year: number;

  @IsUUID(UUID_VERSION)
  @IsNull()
  artistId: ID | null;
}
