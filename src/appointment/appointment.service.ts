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

 async create(dto: CreateAppointmentDto, doctorId: number): Promise<Appointment> {
  const appointment = this.repo.create({
    ...dto,
    doctorId,
     fee: 500,
     discount_percentage: dto.discount_percentage || 0,
  });
  return this.repo.save(appointment);
}

  async getTodayAppointments(doctorId: number): Promise<Appointment[]>
 {
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));

    return this.repo.find({
      where: {
        doctorId, 
        appointmentDate: Between(start, end),
      },
      order: { appointmentDate: 'ASC' },
    });
  }

  async getAllAppointments(doctorId: number): Promise<Appointment[]> {
  return this.repo.find({
    where: { doctorId },
    order: { appointmentDate: 'DESC' }, // newest first
  });
}



  async updateStatus(id: number, status: string, discount: number) {
  const appointment = await this.repo.findOne({ where: { id } });
  if (!appointment) throw new NotFoundException('Appointment not found');
  
appointment.status = status as 'pending' | 'accepted' | 'rejected' | 'cancelled';
  appointment.discount_percentage = discount;

  return this.repo.save(appointment);
}





async getDoctorDashboard(doctorId: number, filter: DashboardFilterDto) {
  const { type = 'daily', date = new Date().toISOString() } = filter;
  const base = new Date(date);
  let start: Date;
  let end: Date;

  switch (type) {
    case 'daily':
      start = new Date(base);
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setHours(23, 59, 59, 999);
      break;


    case 'monthly':
      start = new Date(base.getFullYear(), base.getMonth(), 1);
      end = new Date(base.getFullYear(), base.getMonth() + 1, 0, 23, 59, 59, 999);
      break;

    case 'yearly':
    default:
      start = new Date(base.getFullYear(), 0, 1);
      end = new Date(base.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;
  }

  const all = await this.repo.find({
    where: {
      doctorId,
      appointmentDate: Between(start, end),
    },
  });

  const accepted = all.filter(a => a.status === 'accepted');
  const pending = all.filter(a => a.status === 'pending');
  const rejected = all.filter(a => a.status === 'rejected');
  const cancelled = all.filter(a => a.status === 'cancelled');

  return {
    total: all.length,
    accepted: accepted.length,
    pending: pending.length,
    rejected: rejected.length,
    cancelled: cancelled.length,
income: all
  .filter(a => a.status === 'accepted')
  .reduce((sum, appt) => {
    const discount = appt.discount_percentage || 0;
    const fee = appt.fee || 0;
    const discountedFee = Math.max(0, fee - (fee * discount) / 100);
    return sum + discountedFee;
  }, 0),


    from: start,
    to: end,
  };
}


}
