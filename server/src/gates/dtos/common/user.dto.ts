import { Expose, Type } from 'class-transformer';
import { IsDefined, IsMongoId, ValidateNested } from 'class-validator';

export class UserDto {
  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'user_id' })
  userId: string;

  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'root_id' })
  rootId: string;

  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'person_id' })
  personId: string;

  @IsDefined()
  access: string[];
}
