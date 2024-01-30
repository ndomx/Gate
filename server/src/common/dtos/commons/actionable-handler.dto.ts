import { IsIn, IsObject, IsOptional, IsString } from 'class-validator';
import { DEVICE_ACTIONS } from 'src/common/constants';
import { DeviceAction } from 'src/common/types';

export class ActionableHandlerDto {
  @IsString()
  @IsIn(DEVICE_ACTIONS)
  action: DeviceAction;

  @IsString()
  deviceId: string;

  @IsObject()
  @IsOptional()
  body?: object;
}
