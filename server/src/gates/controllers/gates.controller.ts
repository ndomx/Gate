import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ActivateDeviceResponseDto } from '../dtos/activate-device-response.dto';
import { GatesService } from '../services/gates.service';
import { UserNodesResponseDto } from 'src/common/dtos/responses/user-nodes-response.dto';

@Controller('gates')
@UseGuards(JwtAuthGuard)
export class GatesController {
  constructor(private readonly gatesService: GatesService) {}

  @Post(':deviceId/activate')
  activateDevice(
    @Param('deviceId') deviceId: string,
    @Request() req,
  ): Promise<ActivateDeviceResponseDto> {
    return this.gatesService.activateDevice(deviceId, req.user.userId);
  }

  @Get('user')
  findUserNodes(
    @Request() req,
    @Query('deviceOnly') deviceOnly?: boolean,
  ): Promise<UserNodesResponseDto> {
    return this.gatesService.findUserNodes(req.user.userId, deviceOnly);
  }
}
