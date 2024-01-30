import { OmitType, PartialType } from '@nestjs/swagger';
import { UserDto } from '../common';

class UserWithOmits extends OmitType(UserDto, ['id'] as const) {}

export class UpdateUserRequestDto extends PartialType(UserWithOmits) {}
