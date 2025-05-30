import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabResult } from './labresult.entity';
import { LabresultService } from './labresult.service';
import { LabresultController } from './labresult.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LabResult])],
  providers: [LabresultService],
  controllers: [LabresultController],
})
export class LabresultModule {}
