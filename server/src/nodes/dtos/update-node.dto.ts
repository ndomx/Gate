import { OmitType, PartialType } from '@nestjs/swagger';
import { NodeDto } from './node.dto';

class NodeWithoutId extends OmitType(NodeDto, ['nodeId']) {}

export class UpdateNodeDto extends PartialType(NodeWithoutId) {}
