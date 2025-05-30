import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { TestModule } from './test/test.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AvailabilityModule } from './availability/availability.module';
import { LabresultModule } from './labresult/labresult.module';
import { TreatmentmessageModule } from './treatmentmessage/treatmentmessage.module';
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), TestModule, PatientModule, DoctorModule, AuthModule, AppointmentModule, AvailabilityModule, LabresultModule, TreatmentmessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
