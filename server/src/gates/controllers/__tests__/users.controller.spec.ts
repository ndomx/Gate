import { Test } from '@nestjs/testing';
import { UsersService } from 'src/gates/services/users.service';
import { UsersController } from '../users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    let module = await Test.createTestingModule({
      providers: [UsersService],
      controllers: [UsersController],
    }).compile();

    controller = module.get(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
