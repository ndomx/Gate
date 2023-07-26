import { OmitType } from '@nestjs/swagger';
import { UserDto } from '../user.dto';

export class CreateUserRequestDto extends OmitType(UserDto, ['id'] as const) {}
