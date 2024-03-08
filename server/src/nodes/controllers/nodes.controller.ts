import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminApiKeyGuard } from 'src/auth/guards/admin-api-key.guard';
import { NodeDto } from '../dtos';
import { CreateNodeRequestDto, UpdateNodeRequestDto } from '../dtos/requests';
import { NodesService } from '../services/nodes.service';

@Controller('nodes')
@UseGuards(AdminApiKeyGuard)
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  create(@Body() request: CreateNodeRequestDto): Promise<NodeDto> {
    return this.nodesService.create(request);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<NodeDto> {
    return this.nodesService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') nodeId: string,
    @Body() fields: UpdateNodeRequestDto,
  ): Promise<NodeDto> {
    return this.nodesService.update(nodeId, fields);
  }

  @Delete(':id')
  delete(@Param('id') nodeId: string): Promise<NodeDto> {
    return this.nodesService.delete(nodeId);
  }
}
