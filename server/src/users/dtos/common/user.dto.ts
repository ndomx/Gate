import { IsArray, IsDefined, IsMongoId, IsString } from 'class-validator';

export class UserDto {
  @IsMongoId()
  id: string;

  @IsString()
  authId: string;

  @IsArray()
  @IsDefined()
  access: string[];
}
