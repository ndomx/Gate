import { OmitType, PartialType } from '@nestjs/swagger';
import { NodeDto } from '../node.dto';

class NodeWithoutId extends OmitType(NodeDto, ['id'] as const) {}

export class UpdateNodeRequestDto extends PartialType(NodeWithoutId) {}
