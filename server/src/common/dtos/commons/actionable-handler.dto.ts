import { IsIn, IsObject, IsOptional, IsString } from 'class-validator';
import { DEVICE_ACTIONS } from 'src/utils/constants';
import { DeviceAction } from 'src/utils/types';

export class ActionableHandlerDto {
  @IsString()
  @IsIn(DEVICE_ACTIONS)
  action: DeviceAction;

  @IsString()
  path: string;

  @IsObject()
  @IsOptional()
  body?: object;
}
