import { IsBoolean, IsDefined } from 'class-validator';
import { NODE_ACTION_CODES, NodeActionCode } from 'src/utils/constants';
import { AreAllIn } from 'src/utils/validators';

export class NodeInfoDto {
  @IsBoolean()
  @IsDefined()
  isDevice: boolean;

  @AreAllIn(NODE_ACTION_CODES)
  supportedActions: NodeActionCode[];
}
