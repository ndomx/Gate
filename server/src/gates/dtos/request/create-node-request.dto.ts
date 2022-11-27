import { Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsMongoId,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { NodeOptionsDto } from '../common/node-options.dto';
import { NodeInfoDto } from '../common/node-info.dto';

export class CreateNodeRequestDto {
  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'admin_id' })
  adminId: string;

  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'root_id' })
  rootId: string;

  @IsString()
  @Matches(/^([a-zA-Z0-9_-]+\/?)+$/)
  path: string;

  @Type(() => NodeOptionsDto)
  @ValidateNested()
  @IsOptional()
  @Expose({ name: 'create_options' })
  createOptions?: NodeOptionsDto;

  @Type(() => NodeInfoDto)
  @ValidateNested()
  @IsDefined()
  @Expose({ name: 'node_info' })
  nodeInfo: NodeInfoDto;
}
