import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { NodeDto } from 'src/nodes/dtos/node.dto';

export class GetNodesResponseDto {
  @ValidateNested({ each: true })
  @Type(() => NodeDto)
  @IsDefined()
  nodes: NodeDto[];
}
