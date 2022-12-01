import { Test, TestingModule } from '@nestjs/testing';
import { NodesClientController } from './nodes-client.controller';

describe('NodesClientController', () => {
  let controller: NodesClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NodesClientController],
    }).compile();

    controller = module.get<NodesClientController>(NodesClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
