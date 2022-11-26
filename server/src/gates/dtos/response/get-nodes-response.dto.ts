import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { NodeDto } from '../common/node.dto';

export class GetNodesResponseDto {
  @Type(() => NodeDto)
  @ValidateNested({ each: true })
  nodes: NodeDto[];
}
