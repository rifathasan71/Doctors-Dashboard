import { IsOptional, IsString } from 'class-validator';

export class UpdateMedicalDto {
  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  prescription?: string;

  @IsOptional()
  @IsString()
  treatment_plan?: string;
}
