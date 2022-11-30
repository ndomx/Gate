import { Test, TestingModule } from '@nestjs/testing';
import { GatesController } from './gates.controller';

describe('GatesController', () => {
  let controller: GatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatesController],
    }).compile();

    controller = module.get<GatesController>(GatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
