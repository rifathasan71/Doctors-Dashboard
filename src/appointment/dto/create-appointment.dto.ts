import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  patientId: number;

  @IsString()
  reason: string;

  @IsDateString()
  appointmentDate: string;

  @IsOptional()
  fee?: number;

   @IsInt()
  discount_percentage: number;
}
