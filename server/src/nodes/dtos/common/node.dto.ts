import { IsIn, IsMongoId, IsString, Matches } from 'class-validator';
import { NODE_ACTION_CODES } from 'src/common/constants';
import { NodeActionCode } from 'src/common/types';

export class NodeDto {
  @IsMongoId()
  id: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9-_]+$/)
  name: string;

  @IsString()
  displayName: string;

  @IsString()
  @IsIn(NODE_ACTION_CODES)
  actionCode: NodeActionCode;

  @IsString()
  deviceId: string;
}
