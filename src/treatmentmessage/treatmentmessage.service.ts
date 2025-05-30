import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TreatmentMessage } from './treatmentmessage.entity';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class TreatmentmessageService {
  constructor(
    @InjectRepository(TreatmentMessage)
    private readonly repo: Repository<TreatmentMessage>,
  ) {}

  async sendMessage(dto: CreateMessageDto): Promise<TreatmentMessage> {
    const message = this.repo.create({
      ...dto,
      sender: 'doctor', // hardcoded for now
    });
    return this.repo.save(message);
  }

  async getConversation(patientId: number): Promise<TreatmentMessage[]> {
    return this.repo.find({
      where: { patientId },
      order: { timestamp: 'ASC' },
    });
  }
}
