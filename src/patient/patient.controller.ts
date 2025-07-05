import {
    Controller,
    Get,
    Put,
    Param,
    Body,
    NotFoundException,
    UseGuards,
  } from '@nestjs/common';
  import { PatientService } from './patient.service';
  import { UpdateMedicalDto } from './dto/update-medical.dto';
  import { UpdateProgressDto } from './dto/update-progress.dto';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  import { Res } from '@nestjs/common';
import { Response } from 'express';

  @UseGuards(JwtAuthGuard)

  @Controller('patients')
  export class PatientController {
    constructor(private readonly patientService: PatientService) {}
  
    @Get(':id')
    async getPatient(@Param('id') id: number) {
      const patient = await this.patientService.findOne(id);
      if (!patient) throw new NotFoundException('Patient not found');
      return patient;
    }
  
    @Put(':id/medical')
    updateMedical(
      @Param('id') id: number,
      @Body() dto: UpdateMedicalDto,
    ) {
      return this.patientService.updateMedical(id, dto);
    }
  
    @Put(':id/progress')
    updateProgress(
      @Param('id') id: number,
      @Body() dto: UpdateProgressDto,
    ) {
      return this.patientService.updateProgress(id, dto);
    }
  
   
    @Get(':id/prescription/pdf')
generatePdf(@Param('id') id: number, @Res() res: Response) {
  return this.patientService.generatePrescriptionPdf(id, res);
}

  }
  