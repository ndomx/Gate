import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';
import { UserDto } from '../common/user.dto';

export class AddUserResponseDto extends UserDto {
  @IsMongoId()
  @Expose({ name: 'user_id' })
  userId: string;
}
