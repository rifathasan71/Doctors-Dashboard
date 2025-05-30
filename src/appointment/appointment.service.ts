import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Between } from 'typeorm'; 

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
  ) {}

  async create(dto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.repo.create({
      ...dto,
      doctorId: 1, // hardcoded for now
    });
    return this.repo.save(appointment);
  }

  async getTodayAppointments(): Promise<Appointment[]> {
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));

    return this.repo.find({
      where: {
        doctorId: 1, // hardcoded doctor
        appointmentDate: Between(start, end),
      },
      order: { appointmentDate: 'ASC' },
    });
  }

  async updateStatus(id: number, status: 'accepted' | 'rejected') {
    const appointment = await this.repo.findOne({ where: { id } });
    if (!appointment) throw new NotFoundException('Appointment not found');
    appointment.status = status;
    return this.repo.save(appointment);
  }
}
