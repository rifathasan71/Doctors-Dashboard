import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly service: AvailabilityService) {}

  @Post()
  set(@Body() dto: CreateAvailabilityDto) {
    return this.service.setAvailability(dto);
  }

  @Get()
  get() {
    return this.service.getAvailability();
  }
}
