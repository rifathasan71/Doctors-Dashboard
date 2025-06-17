import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CancellationService } from './cancellation.service';
import { CreateCancellationRequestDto } from './dto/create-cancellation-request.dto';

@Controller('cancellation')
export class CancellationController {
  constructor(private readonly service: CancellationService) {}

  @Post('request')
  createRequest(@Body() dto: CreateCancellationRequestDto) {
    return this.service.createRequest(dto);
  }

  @Get('pending')
  getPending() {
    return this.service.getPendingRequests();
  }

  @Put('approve/:id')
  approve(@Param('id') id: number) {
    return this.service.approveRequest(id);
  }
}
