import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsString,
  ValidateNested,
} from 'class-validator';
import { NodeResponseDto } from 'src/nodes/dtos/responses';
import { DEVICE_ACTIONS } from 'src/utils/constants';
import { DeviceAction } from 'src/utils/types';

export class ActivateDeviceResponseDto {
  @ValidateNested()
  @Type(() => NodeResponseDto)
  @IsDefined()
  node: NodeResponseDto;

  @IsString()
  @IsIn(DEVICE_ACTIONS)
  action: DeviceAction;

  @IsBoolean()
  success: boolean;
}
