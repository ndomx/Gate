import { OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserDto } from './user.dto';

class UserWithOmits extends OmitType(UserDto, ['userId']) {}

export class UpdateUserDto extends PartialType(UserWithOmits) {
  @IsOptional()
  rootId?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  last?: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  access?: string[];
}
