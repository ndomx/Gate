import { Expose } from 'class-transformer';
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

export class UpdateNodeRequestDto {
  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'admin_id' })
  adminId: string;

  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'node_id' })
  nodeId: string;

  @IsString()
  @IsOptional()
  @Matches(/^([a-zA-Z0-9_-]+\/?)+$/)
  path?: string;

  @ValidateNested()
  @IsOptional()
  @Expose({ name: 'update_options' })
  updateOptions?: NodeOptionsDto;

  @ValidateNested()
  @IsOptional()
  @Expose({ name: 'node_info' })
  nodeInfo?: NodeInfoDto;
}
