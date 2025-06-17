import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { CancellationRequest } from './cancellation-request.entity';
import { CreateCancellationRequestDto } from './dto/create-cancellation-request.dto';
import { Appointment } from 'src/appointment/appointment.entity';

@Injectable()
export class CancellationService {
  constructor(
    @InjectRepository(CancellationRequest)
    private readonly cancelRepo: Repository<CancellationRequest>,
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
  ) {}

  async createRequest(dto: CreateCancellationRequestDto) {
    if (!dto.targetDate && !dto.appointmentId) {
      throw new BadRequestException('Must provide targetDate or appointmentId');
    }

    const request = this.cancelRepo.create({
      ...dto,
      status: 'pending',
    });

    return this.cancelRepo.save(request);
  }

  async approveRequest(id: number) {
    const request = await this.cancelRepo.findOne({ where: { id } });
    if (!request) throw new NotFoundException('Request not found');
    if (request.status !== 'pending')
      throw new BadRequestException('Request already processed');

    request.status = 'approved';
    request.approvedAt = new Date();
    await this.cancelRepo.save(request);

    if (request.appointmentId) {
      const appt = await this.appointmentRepo.findOne({
        where: { id: request.appointmentId },
      });
      if (appt) {
        appt.status = 'cancelled';
        await this.appointmentRepo.save(appt);
      }
    } else if (request.targetDate) {
      const start = new Date(`${request.targetDate}T00:00:00`);
      const end = new Date(`${request.targetDate}T23:59:59`);

      const all = await this.appointmentRepo.find({
        where: {
          doctorId: request.doctorId,
          appointmentDate: Between(start, end),
          status: 'accepted',
        },
      });

      for (const appt of all) {
        appt.status = 'cancelled';
        await this.appointmentRepo.save(appt);
      }
    }

    return { message: 'Cancellation approved and processed.' };
  }

  async getPendingRequests() {
    return this.cancelRepo.find({ where: { status: 'pending' } });
  }
}
