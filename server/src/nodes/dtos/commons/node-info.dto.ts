import { IsBoolean, IsDefined, IsIn, IsString } from 'class-validator';
import { NODE_ACTION_CODES } from 'src/utils/constants';
import { NodeActionCode } from 'src/utils/types';

export class NodeInfoDto {
  @IsBoolean()
  @IsDefined()
  isDevice: boolean;

  @IsString()
  @IsIn(NODE_ACTION_CODES)
  actionCode: NodeActionCode;
}
