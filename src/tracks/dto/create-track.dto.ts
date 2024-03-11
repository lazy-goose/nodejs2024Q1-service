import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator-stable';
import { UUID_VERSION } from 'src/constants';
import { ID, Track } from 'src/database/types/models';
import { IsNull } from 'src/utils/validators-extended';

export class CreateTrackDto implements Omit<Track, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID(UUID_VERSION)
  @IsNull()
  artistId: ID | null;

  @IsUUID(UUID_VERSION)
  @IsNull()
  albumId: ID | null;

  @IsNumber()
  @IsPositive()
  duration: number;
}
