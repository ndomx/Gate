import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ActivateDeviceResponseDto } from './dtos/activate-device-response.dto';
import { GatesService } from './gates.service';

@Controller('gates')
export class GatesController {
  constructor(private readonly gatesService: GatesService) {}

  @Get('activate/:device_id')
  @UseGuards(JwtAuthGuard)
  activateDevice(
    @Param('device_id') deviceId: string,
    @Request() req,
  ): Promise<ActivateDeviceResponseDto> {
    return this.gatesService.activateDevice(deviceId, req.user.userId);
  }
}
