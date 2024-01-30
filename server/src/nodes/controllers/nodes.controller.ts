import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { NodesService } from '../services/nodes.service';
import { CreateNodeRequestDto, UpdateNodeRequestDto } from '../dtos/requests';
import { Node } from '../interfaces/node.interface';

@Controller('nodes')
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  create(@Body() request: CreateNodeRequestDto): Promise<Node> {
    return this.nodesService.create(request);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Node> {
    return this.nodesService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') nodeId: string,
    @Body() fields: UpdateNodeRequestDto,
  ): Promise<Node> {
    return this.nodesService.update(nodeId, fields);
  }

  @Delete(':id')
  delete(@Param('id') nodeId: string): Promise<Node> {
    return this.nodesService.delete(nodeId);
  }
}
