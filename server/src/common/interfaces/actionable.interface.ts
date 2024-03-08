import { NodeDto } from 'src/nodes/dtos';
import { ActionableHandlerDto } from '../dtos/commons/actionable-handler.dto';

export interface IActionable {
  activateDevice(node: NodeDto, body: ActionableHandlerDto): Promise<void>;
}
