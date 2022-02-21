import { Test, TestingModule } from '@nestjs/testing';
import { CommercialOperationsController } from './commercial-operations.controller';

describe('CommercialOperations Controller', () => {
  let controller: CommercialOperationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialOperationsController],
    }).compile();

    controller = module.get<CommercialOperationsController>(CommercialOperationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
