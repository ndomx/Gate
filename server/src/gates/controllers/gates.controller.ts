import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Query,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GatesService } from '../services/gates.service';
import { UserNodesResponseDto } from 'src/common/dtos/responses/user-nodes-response.dto';
import { ActivateDeviceRequestDto } from '../../common/dtos/requests/activate-device-request.dto';

@Controller('gates')
@UseGuards(JwtAuthGuard)
export class GatesController {
  constructor(private readonly gatesService: GatesService) {}

  @Post(':deviceId/activate')
  @HttpCode(HttpStatus.NO_CONTENT)
  async activateDevice(
    @Param('deviceId') deviceId: string,
    @Body() activateDeviceRequest: ActivateDeviceRequestDto,
    @Request() req,
  ): Promise<void> {
    await this.gatesService.activateDevice(
      deviceId,
      req.user.userId,
      activateDeviceRequest,
    );
  }

  @Get('user')
  findUserNodes(
    @Request() req,
    @Query('deviceOnly') deviceOnly?: boolean,
  ): Promise<UserNodesResponseDto> {
    return this.gatesService.findUserNodes(req.user.userId, deviceOnly);
  }
}
