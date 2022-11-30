import { OmitType } from '@nestjs/swagger';
import { NodeDto } from './node.dto';

export class CreateNodeDto extends OmitType(NodeDto, ['nodeId']) {}
