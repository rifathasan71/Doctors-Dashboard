import { Module } from '@nestjs/common';
import { TreatmentmessageController } from './treatmentmessage.controller';
import { TreatmentmessageService } from './treatmentmessage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentMessage } from './treatmentmessage.entity';
@Module({
  imports: [TypeOrmModule.forFeature([TreatmentMessage])],
  controllers: [TreatmentmessageController],
  providers: [TreatmentmessageService]
})
export class TreatmentmessageModule {}
