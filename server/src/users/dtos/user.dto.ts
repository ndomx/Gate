import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'user_id' })
  userId: string;

  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'root_id' })
  rootId: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  last: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDefined()
  access: string[];
}
