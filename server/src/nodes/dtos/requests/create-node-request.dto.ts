import { OmitType } from '@nestjs/swagger';
import { NodeDto } from '../node.dto';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateNodeRequestDto extends OmitType(NodeDto, [
  'id',
  'parentId',
] as const) {
  @IsString()
  @IsMongoId()
  @IsOptional()
  parentId?: string;
}
