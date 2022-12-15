import { Test, TestingModule } from '@nestjs/testing';
import { NodesClientService } from './nodes-client.service';

describe('NodesClientService', () => {
  let service: NodesClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodesClientService],
    }).compile();

    service = module.get<NodesClientService>(NodesClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
