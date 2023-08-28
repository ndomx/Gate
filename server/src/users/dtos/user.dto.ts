import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { AccessRole } from 'src/common/types';

export class UserDto {
  @IsMongoId()
  id: string;

  @IsMongoId()
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

  @IsArray()
  @IsDefined()
  access: string[];

  @IsArray()
  @IsOptional()
  roles?: AccessRole[];
}
