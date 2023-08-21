import { IsString } from 'class-validator';
import { ActivateDeviceRequestDto } from 'src/common/dtos/requests/activate-device-request.dto';

export class ActivateMqttDeviceRequestDto extends ActivateDeviceRequestDto {
  @IsString()
  topic: string;
}
