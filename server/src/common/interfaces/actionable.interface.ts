import { ActionableHandlerDto } from '../dtos/commons/actionable-handler.dto';
import { NodeDto } from 'src/nodes/dtos/node.dto';

export interface IActionable {
  activateDevice(node: NodeDto, body: ActionableHandlerDto): Promise<void>;
}
