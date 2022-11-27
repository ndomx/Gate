import { PartialType, OmitType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsDefined,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { NodeOptionsDto } from '../common/node-options.dto';
import { NodeDto } from '../common/node.dto';

class NodeWithOmits extends OmitType(NodeDto, ['nodeId', 'rootId']) {}

export class UpdateNodeRequestDto {
  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'admin_id' })
  adminId: string;

  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'root_id' })
  rootId: string;

  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'node_id' })
  nodeId: string;

  @Type(() => PartialType(NodeWithOmits))
  @ValidateNested()
  @IsDefined()
  node: Partial<NodeWithOmits>;

  @Type(() => NodeOptionsDto)
  @ValidateNested()
  @IsOptional()
  @Expose({ name: 'update_options' })
  updateOptions?: NodeOptionsDto;
}
