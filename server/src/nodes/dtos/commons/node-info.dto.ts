import { IsBoolean, IsDefined } from 'class-validator';

export class NodeInfoDto {
  @IsBoolean()
  @IsDefined()
  isDevice: boolean;
}
