import { Module } from '@nestjs/common';
import { Database } from './database';

@Module({
  exports: [Database],
  providers: [Database],
})
export class DatabaseModule {}
