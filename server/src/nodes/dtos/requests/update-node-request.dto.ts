import { OmitType, PartialType } from '@nestjs/swagger';
import { NodeDto } from '../common';

class NodeWithoutId extends OmitType(NodeDto, ['id'] as const) {}

export class UpdateNodeRequestDto extends PartialType(NodeWithoutId) {}
