import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateProgressDto {
  @IsOptional()
  @IsString()
  progress_notes?: string;

  @IsOptional()
  @IsDateString()
  next_appointment?: string; // ISO format: '2025-05-01T00:00:00Z'
}
