import { Test, TestingModule } from '@nestjs/testing';
import { NodesCrudService } from './nodes-crud.service';

describe('NodesCrudService', () => {
  let service: NodesCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodesCrudService],
    }).compile();

    service = module.get<NodesCrudService>(NodesCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
