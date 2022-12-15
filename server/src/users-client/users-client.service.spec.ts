import { Test, TestingModule } from '@nestjs/testing';
import { UsersClientService } from './users-client.service';

describe('UsersClientService', () => {
  let service: UsersClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersClientService],
    }).compile();

    service = module.get<UsersClientService>(UsersClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
