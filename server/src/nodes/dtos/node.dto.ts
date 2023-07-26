import { Type } from 'class-transformer';
import {
  IsDefined,
  IsMongoId,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { NodeInfoDto } from './commons';

export class NodeDto {
  @IsMongoId()
  id: string;

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
