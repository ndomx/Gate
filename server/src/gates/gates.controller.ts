import { Controller, Get, Query, Param } from '@nestjs/common';
import { GatesService } from './gates.service';

@Controller('gates')
export class GatesController {
  constructor(private readonly gatesService: GatesService) {}

  @Get('activate/:device_id')
  activateDevice(
    @Param('device_id') deviceId: string,
    @Query('user_id') userId: string,
  ) {
    return this.gatesService.activateDevice(deviceId, userId);
  }
}
