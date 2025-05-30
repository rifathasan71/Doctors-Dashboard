import { IsString } from 'class-validator';

export class UpdateNotesDto {
  @IsString()
  doctorNotes: string;
}
