import { Expose } from 'class-transformer';
import { IsBoolean, IsDefined } from 'class-validator';

export class NodeInfoDto {
  @IsBoolean()
  @IsDefined()
  @Expose({ name: 'is_device' })
  isDevice: boolean;
}
