import { IsString, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class OpenGateDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'device_id' })
  deviceId: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'root_id' })
  rootId: string;

  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'user_id' })
  userId: string;
}
