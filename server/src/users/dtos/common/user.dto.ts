import { IsArray, IsDefined, IsMongoId, IsString } from 'class-validator';

export class UserDto {
  @IsMongoId()
  id: string;

  @IsString()
  externalId: string;

  @IsArray()
  @IsDefined()
  access: string[];
}
