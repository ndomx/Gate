import { Type } from 'class-transformer';
import { IsBoolean, IsString, ValidateNested } from 'class-validator';
import { NodeDto } from 'src/nodes/dtos/node.dto';

export class ActivateDeviceResponseDto {
  @IsBoolean()
  success: boolean;

  @IsString()
  topic: string;

  @ValidateNested()
  @Type(() => NodeDto)
  node: NodeDto;
}
