import { IsString, IsNotEmpty, IsInt } from "class-validator";
import { Expose } from 'class-transformer';

export class OpenGateRequestDto {
    @IsString()
    @IsNotEmpty()
    @Expose({ name: "gate_id" })
    gateId: string;

    @IsString()
    @IsNotEmpty()
    @Expose({ name: "device_id" })
    deviceId: string;

    @IsInt()
    timestamp: number;
}