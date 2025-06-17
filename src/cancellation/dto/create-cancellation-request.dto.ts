import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateCancellationRequestDto {
  @IsInt()
  doctorId: number;

  @IsOptional()
  @IsDateString()
  targetDate?: string;

  @IsOptional()
  @IsInt()
  appointmentId?: number;

  @IsOptional()
  @IsString()
  reason?: string;
}
