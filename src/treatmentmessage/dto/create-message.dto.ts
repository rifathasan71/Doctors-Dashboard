import { IsInt, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  patientId: number;

  @IsString()
  content: string;
}
