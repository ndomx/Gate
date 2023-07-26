import * as bcrypt from 'bcrypt';

export async function hashPassword(
  password: string,
  rounds = 10,
): Promise<string> {
  return bcrypt.hash(password, rounds);
}
