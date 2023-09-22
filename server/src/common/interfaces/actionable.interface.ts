import { NodeResponseDto } from 'src/nodes/dtos/responses';
import { ActionableHandlerDto } from '../dtos/commons/actionable-handler.dto';

export interface IActionable {
  activateDevice(
    node: NodeResponseDto,
    body: ActionableHandlerDto,
  ): Promise<void>;
}
