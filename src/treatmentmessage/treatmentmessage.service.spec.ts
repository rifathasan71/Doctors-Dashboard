import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentmessageService } from './treatmentmessage.service';

describe('TreatmentmessageService', () => {
  let service: TreatmentmessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TreatmentmessageService],
    }).compile();

    service = module.get<TreatmentmessageService>(TreatmentmessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
