import { IsIn, IsString } from 'class-validator';
import { DEVICE_ACTIONS } from 'src/utils/constants';
import { DeviceAction } from 'src/utils/types';

export class ActivateDeviceRequestDto {
  @IsString()
  @IsIn(DEVICE_ACTIONS)
  action: DeviceAction;

  actionDetails?: Record<string, unknown>;
}
