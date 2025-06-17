import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CancellationRequest } from './cancellation-request.entity';
import { Appointment } from '../appointment/appointment.entity';
import { CancellationService } from './cancellation.service';
import { CancellationController } from './cancellation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CancellationRequest, 
      Appointment          
    ])
  ],
  providers: [CancellationService],
  controllers: [CancellationController],
})
export class CancellationModule {}
