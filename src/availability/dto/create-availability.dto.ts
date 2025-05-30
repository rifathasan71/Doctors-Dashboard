import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class DayAvailability {
  @IsString()
  dayOfWeek: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}

export class CreateAvailabilityDto {
  @ValidateNested({ each: true })
  @Type(() => DayAvailability)
  availability: DayAvailability[];
}
