import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsOptional()
  artistId?: string | null;

  @IsString()
  @IsOptional()
  albumId?: string | null;

  @IsNotEmpty()
  @IsInt()
  duration?: number;
}
