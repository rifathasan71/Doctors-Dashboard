import { Test, TestingModule } from '@nestjs/testing';
import { LabresultService } from './labresult.service';

describe('LabresultService', () => {
  let service: LabresultService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LabresultService],
    }).compile();

    service = module.get<LabresultService>(LabresultService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
