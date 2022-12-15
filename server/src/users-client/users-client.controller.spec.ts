import { Test, TestingModule } from '@nestjs/testing';
import { UsersClientController } from './users-client.controller';

describe('UsersClientController', () => {
  let controller: UsersClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersClientController],
    }).compile();

    controller = module.get<UsersClientController>(UsersClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
