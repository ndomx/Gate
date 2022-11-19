import { ValidateNested } from 'class-validator';
import { NodeDto } from '../common/node.dto';

export class GetNodesResponseDto {
  @ValidateNested({ each: true })
  nodes: NodeDto[];
}
