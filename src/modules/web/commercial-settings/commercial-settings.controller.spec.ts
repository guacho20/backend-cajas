import { Test, TestingModule } from '@nestjs/testing';
import { CommercialSettingsController } from './commercial-settings.controller';

describe('CommercialSettings Controller', () => {
  let controller: CommercialSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialSettingsController],
    }).compile();

    controller = module.get<CommercialSettingsController>(CommercialSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
