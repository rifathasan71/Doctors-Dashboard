import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    Param,
    UseGuards,
  } from '@nestjs/common';
  import { AppointmentService } from './appointment.service';
  import { CreateAppointmentDto } from './dto/create-appointment.dto';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  
  @UseGuards(JwtAuthGuard)
  @Controller('appointments')
  export class AppointmentController {
    constructor(private readonly service: AppointmentService) {}
  
    // a) Doctor manually adds appointment
    @Post()
    create(@Body() dto: CreateAppointmentDto) {
      return this.service.create(dto);
    }
  
    // b) Doctor views today's appointments
    @Get('today')
    getToday() {
      return this.service.getTodayAppointments();
    }
  
    // c) Doctor accepts or rejects appointment
    @Put(':id/status')
    updateStatus(
      @Param('id') id: number,
      @Body('status') status: 'accepted' | 'rejected',
    ) {
      return this.service.updateStatus(id, status);
    }
  }
  