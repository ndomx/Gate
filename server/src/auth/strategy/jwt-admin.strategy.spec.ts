import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { JwtAdminStrategy } from './jwt-admin.strategy';

const configServiceMock = {
  get: jest.fn((token) => token),
};

describe('JwtAdminStrategy', () => {
  let strategy: JwtAdminStrategy;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtAdminStrategy,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    strategy = module.get(JwtAdminStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });
});
