import { IsString, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class OpenGateDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'gate_id' })
  gateId: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'device_key' })
  deviceKey: string;
}
