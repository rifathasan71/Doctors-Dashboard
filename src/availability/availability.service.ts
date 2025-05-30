import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './availability.entity';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private readonly repo: Repository<Availability>,
  ) {}

  async setAvailability(dto: CreateAvailabilityDto) {
    const results: Availability[] = [];

  
    for (const item of dto.availability) {
      const existing = await this.repo.findOne({
        where: { doctorId: 1, dayOfWeek: item.dayOfWeek },
      });
  
      if (existing) {
        existing.startTime = item.startTime;
        existing.endTime = item.endTime;
        results.push(await this.repo.save(existing));
      } else {
        const newAvailability = this.repo.create({
          ...item,
          doctorId: 1,
        });
        results.push(await this.repo.save(newAvailability));
      }
    }
  
    return results;
  }
  

  async getAvailability(): Promise<Availability[]> {
    return this.repo.find({
      where: { doctorId: 1 },
      order: { dayOfWeek: 'ASC' },
    });
  }
}
