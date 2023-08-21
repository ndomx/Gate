import { NodeResponseDto } from 'src/nodes/dtos/responses';
import { ActivateDeviceRequestDto } from '../dtos/requests/activate-device-request.dto';

export interface IActionable {
  activateDevice(
    node: NodeResponseDto,
    activateRequest: ActivateDeviceRequestDto,
  ): Promise<void>;
}
