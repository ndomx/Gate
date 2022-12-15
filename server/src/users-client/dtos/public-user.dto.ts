import { OmitType } from '@nestjs/swagger';
import { UserDto } from 'src/users/dtos/user.dto';

export class PublicUserDto extends OmitType(UserDto, [
  'password',
] as const) {}
