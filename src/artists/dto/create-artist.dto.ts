import { IsBoolean, IsNotEmpty, IsString } from 'class-validator-stable';
import { Artist } from 'src/database/types/models';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  grammy: boolean;
}
