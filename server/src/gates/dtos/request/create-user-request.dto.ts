import { OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDefined, IsMongoId, ValidateNested } from 'class-validator';
import { PersonDto } from '../common/person.dto';
import { UserDto } from '../common/user.dto';

export class CreateUserRequestDto extends OmitType(UserDto, [
  'userId',
  'personId',
]) {
  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'admin_id' })
  adminId: string;

  @Type(() => PersonDto)
  @ValidateNested()
  @IsDefined()
  person: PersonDto;
}
