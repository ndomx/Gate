import { IsInt, IsString } from 'class-validator';

export class DeviceAckDto {
  @IsInt()
  status: number;

  @IsString()
  deviceId: string;
}
