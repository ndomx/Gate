import { OmitType } from '@nestjs/swagger';
import { NodeDto } from '../node.dto';

export class CreateNodeRequestDto extends OmitType(NodeDto, ['id'] as const) {}
