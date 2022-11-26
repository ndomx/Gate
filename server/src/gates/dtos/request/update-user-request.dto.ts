import { PartialType, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PersonDto } from '../common/person.dto';
import { UserDto } from '../common/user.dto';

class UserWithOmits extends PickType(UserDto, ['access']) {}

export class UpdateUserRequestDto extends PartialType(UserWithOmits) {
  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'admin_id' })
  adminId: string;

  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'user_id' })
  userId: string;

  @Type(() => PersonDto)
  @ValidateNested()
  @IsOptional()
  person?: PersonDto;
}
