import { IsString, IsInt } from 'class-validator';

export class CreateLabResultDto {
  @IsInt()
  patientId: number;

  @IsString()
  testType: string;

  @IsString()
  resultSummary: string;
}
