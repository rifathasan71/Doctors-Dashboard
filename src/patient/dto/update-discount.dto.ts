import { IsInt, Min, Max } from 'class-validator';

export class UpdateDiscountDto {
  @IsInt()
  @Min(0)
  @Max(100)
  discount_percentage: number;
}
