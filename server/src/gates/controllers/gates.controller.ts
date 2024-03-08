import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { GatesService } from '../services/gates.service';
import { UserNodesResponseDto } from 'src/common/dtos/responses/user-nodes-response.dto';
import { ActivateDeviceRequestDto, CommandExecutionDto } from '../dtos';
import { UsersApiKeyGuard } from 'src/auth/guards/users-api-key.guard';

@Controller('gates')
@UseGuards(UsersApiKeyGuard)
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

  @Get('nodes/external/:userId')
  findNodesByExternalId(
    @Param('userId') userId: string,
  ): Promise<UserNodesResponseDto> {
    return this.gatesService.findNodesByAuthId(userId);
  }

  @Get(':nodeId/status')
  getCommandExecutionStatus(
    @Param('nodeId') nodeId: string,
  ): CommandExecutionDto {
    return this.gatesService.getCommandExecutionStatus(nodeId);
  }
}
