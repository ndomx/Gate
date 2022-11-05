import { IsInt } from 'class-validator';
import { OpenGateDto } from './open-gate.dto';

export class OpenGateRequestDto extends OpenGateDto {
  @IsInt()
  timestamp: number;
}
