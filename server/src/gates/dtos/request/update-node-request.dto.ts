import { Expose } from 'class-transformer';
import {
  IsDefined,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { NodeOptionsDto } from '../common/node-options.dto';
import { NodeDto } from '../common/node.dto';

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

  @IsDefined()
  @ValidateNested()
  node: Partial<NodeDto>;

  @ValidateNested()
  @IsOptional()
  @Expose({ name: 'update_options' })
  updateOptions?: NodeOptionsDto;
}
