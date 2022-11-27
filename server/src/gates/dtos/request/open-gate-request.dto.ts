import { IsInt } from 'class-validator';
import { OpenGateDto } from '../common/open-gate.dto';

export class OpenGateRequestDto extends OpenGateDto {
  @IsInt()
  timestamp: number;
}
