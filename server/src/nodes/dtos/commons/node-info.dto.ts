import { IsBoolean, IsDefined } from 'class-validator';
import { NODE_ACTION_CODES } from 'src/utils/constants';
import { NodeActionCode } from 'src/utils/types';
import { AreAllIn } from 'src/utils/validators';

export class NodeInfoDto {
  @IsBoolean()
  @IsDefined()
  isDevice: boolean;

  @AreAllIn(NODE_ACTION_CODES)
  supportedActions: NodeActionCode[];
}
