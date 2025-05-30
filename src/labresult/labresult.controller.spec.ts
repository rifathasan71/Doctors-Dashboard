import { Test, TestingModule } from '@nestjs/testing';
import { LabresultController } from './labresult.controller';

describe('LabresultController', () => {
  let controller: LabresultController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LabresultController],
    }).compile();

    controller = module.get<LabresultController>(LabresultController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
