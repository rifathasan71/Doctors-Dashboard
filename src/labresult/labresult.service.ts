import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LabResult } from './labresult.entity';
import { CreateLabResultDto } from './dto/create-labresult.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';

@Injectable()
export class LabresultService {
  constructor(
    @InjectRepository(LabResult)
    private readonly repo: Repository<LabResult>,
  ) {}

  async create(dto: CreateLabResultDto): Promise<LabResult> {
    const result = this.repo.create(dto);
    return this.repo.save(result);
  }

  async findByPatientId(patientId: number): Promise<LabResult[]> {
    return this.repo.find({
      where: { patientId },
      order: { uploadedAt: 'DESC' },
    });
  }

  async updateDoctorNotes(id: number, dto: UpdateNotesDto): Promise<LabResult> {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) throw new NotFoundException('Lab result not found');

    result.doctorNotes = dto.doctorNotes;
    return this.repo.save(result);
  }
}
