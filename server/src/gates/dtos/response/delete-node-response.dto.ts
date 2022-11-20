import { IsOptional, ValidateNested } from 'class-validator';
import { NodeDto } from '../common/node.dto';
import { DefaultResponseDto } from './default-response.dto';

export class DeleteNodeResponseDto extends DefaultResponseDto {
  @IsOptional()
  @ValidateNested()
  node?: NodeDto;
}
