import { IsDateString, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  patientName: string;

  @IsString()
  reason: string;

  @IsDateString()
  appointmentDate: string;
}
