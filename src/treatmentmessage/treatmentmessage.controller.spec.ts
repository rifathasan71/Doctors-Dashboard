import { Test, TestingModule } from '@nestjs/testing';
import { TreatmentmessageController } from './treatmentmessage.controller';

describe('TreatmentmessageController', () => {
  let controller: TreatmentmessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TreatmentmessageController],
    }).compile();

    controller = module.get<TreatmentmessageController>(TreatmentmessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
