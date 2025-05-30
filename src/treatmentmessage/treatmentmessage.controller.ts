import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { TreatmentmessageService } from './treatmentmessage.service';
  import { CreateMessageDto } from './dto/create-message.dto';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  
  @UseGuards(JwtAuthGuard)
  @Controller('messages')
  export class TreatmentmessageController {
    constructor(private readonly service: TreatmentmessageService) {}
  
    // Send doctor message
    @Post()
    send(@Body() dto: CreateMessageDto) {
      return this.service.sendMessage(dto);
    }
  
    // View conversation with patient
    @Get('patient/:id')
    chat(@Param('id') patientId: number) {
      return this.service.getConversation(patientId);
    }
  }
  