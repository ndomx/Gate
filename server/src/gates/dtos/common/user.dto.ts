import { IsString, ValidateNested } from 'class-validator';
import { UserPermissionsDto } from './user-permissions.dto';

export class UserDto {
  @IsString()
  name: string;

  @IsString()
  last: string;

  @ValidateNested({ each: true })
  admin: UserPermissionsDto[];

  @ValidateNested({ each: true })
  access: UserPermissionsDto[];
}
