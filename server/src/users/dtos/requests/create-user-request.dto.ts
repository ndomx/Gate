import { OmitType } from '@nestjs/swagger';
import { UserDto } from '../common';

export class CreateUserRequestDto extends OmitType(UserDto, ['id'] as const) {}
