import { JwtAdminAuthGuard } from './jwt-admin-auth.guard';

describe('JwtAdminAuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAdminAuthGuard()).toBeDefined();
  });
});
