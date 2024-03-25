import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [DatabaseModule],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
