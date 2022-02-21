import { Test, TestingModule } from '@nestjs/testing';
import { CommercialEntitiesController } from './commercial-entities.controller';

describe('CommercialEntities Controller', () => {
  let controller: CommercialEntitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialEntitiesController],
    }).compile();

    controller = module.get<CommercialEntitiesController>(CommercialEntitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
