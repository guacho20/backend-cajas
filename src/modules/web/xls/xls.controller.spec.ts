import { Test, TestingModule } from '@nestjs/testing';
import { XlsController } from './xls.controller';

describe('Xls Controller', () => {
  let controller: XlsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XlsController],
    }).compile();

    controller = module.get<XlsController>(XlsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
