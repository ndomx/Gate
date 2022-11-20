import { IsOptional, ValidateNested } from 'class-validator';
import { NodeDto } from '../common/node.dto';
import { DefaultResponseDto } from './default-response.dto';

export class CreateNodeResponseDto extends DefaultResponseDto {
  @IsOptional()
  @ValidateNested()
  node?: NodeDto;
}
