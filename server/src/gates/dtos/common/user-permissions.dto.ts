import { Expose } from 'class-transformer';
import { IsMongoId, IsString } from 'class-validator';

export class UserPermissionsDto {
  @IsMongoId()
  @Expose({ name: 'root_id' })
  rootId: string;

  @IsString()
  prefix: string;
}
