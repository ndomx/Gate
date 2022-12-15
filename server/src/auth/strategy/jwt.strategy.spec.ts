import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { JwtStrategy } from './jwt.strategy';

const configServiceMock = {
  get: jest.fn((token) => token),
};

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    strategy = module.get(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });
});
