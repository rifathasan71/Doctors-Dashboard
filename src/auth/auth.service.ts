import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DoctorService } from 'src/doctor/doctor.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly doctorService: DoctorService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const doctor = await this.doctorService.findByPhone(dto.phone);
    if (!doctor || doctor.password !== dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!doctor.isApproved) {
      throw new UnauthorizedException('Doctor not approved yet');
    }

    const payload = { sub: doctor.id, phone: doctor.phone };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        phone: doctor.phone,
        specialization: doctor.specialization,
      },
    };
  }
}
