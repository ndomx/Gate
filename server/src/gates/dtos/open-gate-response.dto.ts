import { OpenGateDto } from './open-gate.dto';

export type OperationResult =
  | 'access-granted'
  | 'access-denied'
  | 'unknown-error';

export class OpenGateResponseDto extends OpenGateDto {
  result: OperationResult;
}
