import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [DatabaseModule],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
