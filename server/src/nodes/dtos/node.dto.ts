import { Type } from 'class-transformer';
import {
  IsDefined,
  IsMongoId,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { NodeInfoDto } from './node-info.dto';

export class NodeDto {
  @IsMongoId()
  nodeId: string;

  @IsMongoId()
  rootId: string;

  @IsMongoId()
  parent: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9-_]+$/)
  name: string;

  @IsString()
  displayName: string;

  @Type(() => NodeInfoDto)
  @ValidateNested()
  @IsDefined()
  nodeInfo: NodeInfoDto;
}
