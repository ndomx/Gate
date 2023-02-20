import { Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsMongoId,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { NodeInfoDto } from 'src/nodes/dtos/node-info.dto';

export class CreateNodeRequestDto {
  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'root_id' })
  rootId: string;

  @IsString()
  @IsDefined()
  @Matches(/^([a-zA-Z0-9_-]+\/?)+$/)
  path: string;

  @IsString()
  @IsDefined()
  @Matches(/^[a-zA-Z0-9_-]+$/)
  name: string;

  @IsString()
  @IsOptional()
  @Expose({ name: 'display_name' })
  displayName: string;

  @Type(() => NodeInfoDto)
  @ValidateNested()
  @IsDefined()
  @Expose({ name: 'node_info' })
  nodeInfo: NodeInfoDto;
}
