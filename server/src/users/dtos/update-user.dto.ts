import { OmitType, PartialType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

class UserWithOmits extends OmitType(UserDto, ['userId']) {}

export class UpdateUserDto extends PartialType(UserWithOmits) {}
