import { OmitType } from '@nestjs/swagger';
import { NodeDto } from '../common';

export class CreateNodeRequestDto extends OmitType(NodeDto, ['id'] as const) {}
