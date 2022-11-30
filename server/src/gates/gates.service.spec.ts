import { Test, TestingModule } from '@nestjs/testing';
import { GatesService } from './gates.service';

describe('GatesService', () => {
  let service: GatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GatesService],
    }).compile();

    service = module.get<GatesService>(GatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
