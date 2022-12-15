import { OmitType } from '@nestjs/swagger';
import { UserDto } from 'src/users/dtos/user.dto';

export class CreateUserRequestDto extends OmitType(UserDto, [
  'userId',
] as const) {}
