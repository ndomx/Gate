import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { NodeDto } from 'src/nodes/dtos/node.dto';
import { CreateNodeRequestDto } from './dtos/create-node-request.dto';
import { GetNodesResponseDto } from './dtos/get-nodes-response.dto';
import { UpdateNodeRequestDto } from './dtos/update-node-request.dto';
import { UserNodesResponseDto } from './dtos/user-nodes-response.dto';
import { NodesClientService } from './nodes-client.service';

@Controller('nodes-client')
export class NodesClientController {
  constructor(private readonly nodesClientService: NodesClientService) {}

  @Post()
  create(@Body() request: CreateNodeRequestDto): Promise<NodeDto> {
    return this.nodesClientService.createNode(request);
  }

  @Get(':nodeId')
  async getChildren(
    @Param('nodeId') nodeId: string,
  ): Promise<GetNodesResponseDto> {
    return await this.nodesClientService.getChildren(nodeId);
  }

  @Get('user/:userId')
  async getUserNodes(
    @Param('userId') userId: string,
    @Query('device_only') deviceOnly?: boolean,
  ): Promise<UserNodesResponseDto> {
    return await this.nodesClientService.getUserNodes(userId, deviceOnly);
  }

  @Get()
  async getMatching(
    @Query('prefix') prefix: string,
  ): Promise<GetNodesResponseDto> {
    return await this.nodesClientService.getNodesByPrefix(prefix);
  }

  @Patch(':nodeId')
  update(
    @Param('nodeId') nodeId: string,
    @Body() fields: UpdateNodeRequestDto,
  ): Promise<NodeDto> {
    return this.nodesClientService.updateNode(nodeId, fields);
  }

  @Delete(':nodeId')
  remove(@Param('nodeId') nodeId: string): Promise<NodeDto> {
    return this.nodesClientService.deleteNode(nodeId);
  }
}
