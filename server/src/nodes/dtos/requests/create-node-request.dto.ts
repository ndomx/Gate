import { OmitType } from '@nestjs/swagger';
import { NodeDto } from '../node.dto';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateNodeRequestDto extends OmitType(NodeDto, [
  'id',
  'parent',
] as const) {
  @IsString()
  @IsMongoId()
  @IsOptional()
  parent?: string;
}
