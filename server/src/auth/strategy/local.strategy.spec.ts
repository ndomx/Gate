import { Test } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { LocalStrategy } from './local.strategy';

const authServiceMock = {
  validate: jest.fn(),
};

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    strategy = module.get(LocalStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });
});
