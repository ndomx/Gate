import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NodesService } from '../services/nodes.service';
import { JwtAdminAuthGuard } from 'src/auth/guards/jwt-admin-auth.guard';
import { CreateNodeRequestDto, UpdateNodeRequestDto } from '../dtos/requests';
import { NodeResponseDto } from '../dtos/responses';

@Controller('nodes')
@UseGuards(JwtAdminAuthGuard)
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  create(@Body() request: CreateNodeRequestDto): Promise<NodeResponseDto> {
    return this.nodesService.create(request);
  }

  @Get(':id/children')
  findChildren(@Param('id') nodeId: string): Promise<NodeResponseDto[]> {
    return this.nodesService.findChildrenById(nodeId);
  }

  @Get(':rootId/match')
  findByPrefix(
    @Param('rootId') rootId: string,
    @Query('prefix') prefix: string,
  ): Promise<NodeResponseDto[]> {
    return this.nodesService.findByPrefix(prefix, rootId);
  }

  @Patch(':id')
  update(
    @Param('id') nodeId: string,
    @Body() fields: UpdateNodeRequestDto,
  ): Promise<NodeResponseDto> {
    return this.nodesService.update(nodeId, fields);
  }

  @Delete(':id')
  delete(@Param('id') nodeId: string): Promise<NodeResponseDto> {
    return this.nodesService.delete(nodeId);
  }
}
