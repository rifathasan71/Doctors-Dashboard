import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import { LabresultService } from './labresult.service';
  import { CreateLabResultDto } from './dto/create-labresult.dto';
  import { UpdateNotesDto } from './dto/update-notes.dto';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  
  @UseGuards(JwtAuthGuard)
  @Controller('labresults')
  export class LabresultController {
    constructor(private readonly service: LabresultService) {}
  
    @Post()
    create(@Body() dto: CreateLabResultDto) {
      return this.service.create(dto);
    }
  
    @Get('patient/:id')
    findByPatient(@Param('id') patientId: number) {
      return this.service.findByPatientId(patientId);
    }
  
    @Put(':id/notes')
    updateNotes(@Param('id') id: number, @Body() dto: UpdateNotesDto) {
      return this.service.updateDoctorNotes(id, dto);
    }
  }
  