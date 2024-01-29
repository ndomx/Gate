import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { GatesService } from '../services/gates.service';
import { UserNodesResponseDto } from 'src/common/dtos/responses/user-nodes-response.dto';
import { ActivateDeviceRequestDto } from '../dtos/requests/activate-device-request.dto';
import { CommandExecutionDto } from '../dtos/commons/command-execution.dto';

@Controller('gates')
export class GatesController {
  constructor(private readonly gatesService: GatesService) {}

  @Post(':nodeId/activate')
  @HttpCode(HttpStatus.NO_CONTENT)
  activateDevice(
    @Param('nodeId') nodeId: string,
    @Body() activateDeviceRequest: ActivateDeviceRequestDto,
  ): Promise<void> {
    return this.gatesService.activateDevice(nodeId, activateDeviceRequest);
  }

  @Get('user/:userId/nodes')
  findUserNodes(
    @Param('userId') userId: string,
  ): Promise<UserNodesResponseDto> {
    return this.gatesService.findUserNodes(userId);
  }

  @Get(':nodeId/status')
  getCommandExecutionStatus(
    @Param('nodeId') nodeId: string,
  ): CommandExecutionDto {
    return this.gatesService.getCommandExecutionStatus(nodeId);
  }
}
