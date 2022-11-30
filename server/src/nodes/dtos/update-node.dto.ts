import { OmitType, PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsMongoId } from 'class-validator';
import { NodeDto } from './node.dto';

class NodeWithoutId extends OmitType(NodeDto, ['nodeId']) {}

export class UpdateNodeDto extends PartialType(NodeWithoutId) {}
