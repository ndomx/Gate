import { Controller, Get, Query, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GatesService } from './gates.service';

@Controller('gates')
export class GatesController {
  constructor(private readonly gatesService: GatesService) {}

  @Get('activate/:device_id')
  @UseGuards(JwtAuthGuard)
  activateDevice(
    @Param('device_id') deviceId: string,
    @Request() req
  ) {
    return this.gatesService.activateDevice(deviceId, req.user.userId);
  }
}
