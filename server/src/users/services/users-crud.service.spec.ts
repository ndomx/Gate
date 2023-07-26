import { Test, TestingModule } from '@nestjs/testing';
import { UsersCrudService } from './users-crud.service';

describe('UsersCrudService', () => {
  let service: UsersCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersCrudService],
    }).compile();

    service = module.get(UsersCrudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
