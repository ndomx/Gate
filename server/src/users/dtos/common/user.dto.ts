import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsMongoId()
  id: string;

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

  @IsArray()
  @IsDefined()
  access: string[];

  @IsString()
  authId: string;
}
