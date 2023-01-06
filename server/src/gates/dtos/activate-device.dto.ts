import { IsString } from "class-validator";

export class ActivateDeviceDto {
  @IsString()
  action: string;
}
