import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import { RegisterDoctorDto } from './dto/register-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async register(dto: RegisterDoctorDto): Promise<Doctor> {
    const doctor = this.doctorRepository.create(dto);
    return this.doctorRepository.save(doctor);
  }

  async findByPhone(phone: string): Promise<Doctor | null> {
    return this.doctorRepository.findOne({ where: { phone } });
  }

  async findById(id: number): Promise<Doctor | null> {
    return this.doctorRepository.findOne({ where: { id } });
  }
}
