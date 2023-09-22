import { OmitType, PartialType } from '@nestjs/swagger';
import { UserDto } from '../user.dto';

class UserWithOmits extends OmitType(UserDto, ['id'] as const) {}

export class UpdateUserRequestDto extends PartialType(UserWithOmits) {}
