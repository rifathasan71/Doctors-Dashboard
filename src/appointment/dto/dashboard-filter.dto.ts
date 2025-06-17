import { IsDateString, IsOptional, IsIn } from 'class-validator';

export class DashboardFilterDto {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsIn(['daily', 'monthly', 'yearly'])
  type?: 'daily' | 'monthly' | 'yearly';
}
