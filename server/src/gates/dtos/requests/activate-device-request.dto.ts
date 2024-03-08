import { IsIn, IsOptional, IsString } from 'class-validator';
import { DEVICE_ACTIONS } from 'src/common/constants';
import { DeviceAction } from 'src/common/types';

export class ActivateDeviceRequestDto {
  @IsString()
  @IsIn(DEVICE_ACTIONS)
  action: DeviceAction;

  @IsOptional()
  actionDetails?: Record<string, unknown>;

  @IsString()
  userId: string;
}
