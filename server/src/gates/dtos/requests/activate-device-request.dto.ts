import { IsIn, IsString } from 'class-validator';
import { NODE_ACTION_CODES, NodeActionCode } from 'src/utils/constants';

export class ActivateDeviceRequestDto {
  @IsString()
  @IsIn(NODE_ACTION_CODES)
  action: NodeActionCode;
}
