import { Controller, Query, Request, UseGuards } from '@nestjs/common';
import { NodesService } from '../services/nodes.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserNodesResponseDto } from 'src/common/dtos/responses/user-nodes-response.dto';

@Controller('public/nodes')
@UseGuards(JwtAuthGuard)
export class NodesPublicController {
  constructor(private readonly nodesService: NodesService) {}

  findUserNodes(
    @Request() req,
    @Query('deviceOnly') deviceOnly?: boolean,
  ): Promise<UserNodesResponseDto> {
    return this.nodesService.findByUserId(req.user.userId, deviceOnly);
  }
}
