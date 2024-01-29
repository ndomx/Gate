import { IsIn, IsOptional, IsString } from 'class-validator';
import { DEVICE_ACTIONS } from 'src/utils/constants';
import { DeviceAction } from 'src/utils/types';

export class ActivateDeviceRequestDto {
  @IsString()
  @IsIn(DEVICE_ACTIONS)
  action: DeviceAction;

  @IsOptional()
  actionDetails?: Record<string, unknown>;

  @IsString()
  userAuthId: string;
}
