import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Between } from 'typeorm'; 
import { DashboardFilterDto } from './dto/dashboard-filter.dto';

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


  async getDoctorDashboard(doctorId: number, filter: DashboardFilterDto) {
  const { type = 'daily', date = new Date().toISOString() } = filter;
  const base = new Date(date);
  let start: Date, end: Date;

  if (type === 'daily') {
    start = new Date(base.setHours(0, 0, 0, 0));
    end = new Date(base.setHours(23, 59, 59, 999));
  } else if (type === 'monthly') {
    start = new Date(base.getFullYear(), base.getMonth(), 1);
    end = new Date(base.getFullYear(), base.getMonth() + 1, 0, 23, 59, 59, 999);
  } else {
    start = new Date(base.getFullYear(), 0, 1);
    end = new Date(base.getFullYear(), 11, 31, 23, 59, 59, 999);
  }

  const all = await this.repo.find({
    where: {
      doctorId,
      appointmentDate: Between(start, end),
    },
  });

  return {
    total: all.length,
    accepted: all.filter(a => a.status === 'accepted').length,
    pending: all.filter(a => a.status === 'pending').length,
    rejected: all.filter(a => a.status === 'rejected').length,
    cancelled: all.filter(a => a.status === 'cancelled').length,
    income: all
      .filter(a => a.status === 'accepted')
      .reduce((sum, appt) => sum + (appt.fee || 0), 0),
    from: start,
    to: end,
  };
}

}
