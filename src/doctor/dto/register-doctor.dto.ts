import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDoctorDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  degree: string;

  @IsString()
  specialization: string;
}
