import { Node } from 'src/nodes/interfaces/node.interface';
import { ActionableHandlerDto } from '../dtos/commons/actionable-handler.dto';

export interface IActionable {
  activateDevice(node: Node, body: ActionableHandlerDto): Promise<void>;
}
