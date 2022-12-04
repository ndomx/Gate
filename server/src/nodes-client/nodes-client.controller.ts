import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Query,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAdminAuthGuard } from 'src/auth/guards/jwt-admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { NodeDto } from 'src/nodes/dtos/node.dto';
import { CreateNodeRequestDto } from './dtos/create-node-request.dto';
import { GetNodesResponseDto } from './dtos/get-nodes-response.dto';
import { UpdateNodeRequestDto } from './dtos/update-node-request.dto';
import { UserNodesResponseDto } from './dtos/user-nodes-response.dto';
import { NodesClientService } from './nodes-client.service';

@Controller('nodes-client')
@UseGuards(JwtAdminAuthGuard)
export class NodesClientController {
  constructor(private readonly nodesClientService: NodesClientService) {}

  @Post()
  @UseGuards(JwtAdminAuthGuard)
  create(@Body() request: CreateNodeRequestDto): Promise<NodeDto> {
    return this.nodesClientService.createNode(request);
  }

  @Get('/children/:nodeId')
  @UseGuards(JwtAdminAuthGuard)
  async getChildren(
    @Param('nodeId') nodeId: string,
  ): Promise<GetNodesResponseDto> {
    return await this.nodesClientService.getChildren(nodeId);
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async getUserNodes(
    @Request() req,
    @Query('device_only') deviceOnly?: boolean,
  ): Promise<UserNodesResponseDto> {
    return await this.nodesClientService.getUserNodes(
      req.user.userId,
      deviceOnly,
    );
  }

  @Get('/match')
  @UseGuards(JwtAdminAuthGuard)
  async getMatching(
    @Query('prefix') prefix: string,
  ): Promise<GetNodesResponseDto> {
    return await this.nodesClientService.getNodesByPrefix(prefix);
  }

  @Patch(':nodeId')
  @UseGuards(JwtAdminAuthGuard)
  update(
    @Param('nodeId') nodeId: string,
    @Body() fields: UpdateNodeRequestDto,
  ): Promise<NodeDto> {
    return this.nodesClientService.updateNode(nodeId, fields);
  }

  @Delete(':nodeId')
  @UseGuards(JwtAdminAuthGuard)
  remove(@Param('nodeId') nodeId: string): Promise<NodeDto> {
    return this.nodesClientService.deleteNode(nodeId);
  }
}
