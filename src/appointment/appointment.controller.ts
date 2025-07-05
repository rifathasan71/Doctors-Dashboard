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
  import { Query, Req } from '@nestjs/common';
import { DashboardFilterDto } from './dto/dashboard-filter.dto';

  
  @UseGuards(JwtAuthGuard)
  @Controller('appointments')
  export class AppointmentController {
    constructor(private readonly service: AppointmentService) {}
  
    @Post()
    create(@Req() req, @Body() dto: CreateAppointmentDto) {
  const doctorId = req.user.doctorId;
  return this.service.create(dto, doctorId);
    }
  
    @Get('today')
getToday(@Req() req) {
  const doctorId = req.user.doctorId;
  return this.service.getTodayAppointments(doctorId);
}

@Get('all')
getAppointments(@Req() req, @Query('scope') scope: string) {
  const doctorId = req.user.doctorId;
  if (scope === 'today') {
    return this.service.getTodayAppointments(doctorId);
  } else {
    return this.service.getAllAppointments(doctorId);
  }
}

  
   @Put(':id/status')
updateStatus(
  @Param('id') id: number,
  @Body() body: { status: string; discount_percentage: number }
) {
  return this.service.updateStatus(+id, body.status, body.discount_percentage);
}




    //
    @Get('/dashboard')
getDashboard(@Req() req, @Query() filter: DashboardFilterDto) {
  const doctorId = req.user.doctorId;
  return this.service.getDoctorDashboard(doctorId, filter);
}

  }
  