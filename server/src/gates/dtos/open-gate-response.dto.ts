import { OpenGateDto } from './open-gate.dto';

export class OpenGateResponseDto {
  success: Boolean;
  errorCode?: number;
  message?: string;
  topic?: string;
}
