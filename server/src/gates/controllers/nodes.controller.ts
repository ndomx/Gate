import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
  NotImplementedException,
  Param,
  Query,
} from '@nestjs/common';
import { CreateNodeRequestDto } from '../dtos/request/create-node-request.dto';
import { DeleteNodeRequestDto } from '../dtos/request/delete-node-request.dto';
import { GetNodesRequestDto } from '../dtos/request/get-nodes-request.dto';
import { UpdateNodeRequestDto } from '../dtos/request/update-node-request.dto';
import { CreateNodeResponseDto } from '../dtos/response/create-node-response.dto';
import { DeleteNodeResponseDto } from '../dtos/response/delete-node-response.dto';
import { UpdateNodeResponseDto } from '../dtos/response/update-node-response.dto';
import { NodesService } from '../services/nodes.service';

@Controller('nodes')
@UsePipes(new ValidationPipe({ transform: true }))
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post()
  async createNode(
    @Body() request: CreateNodeRequestDto,
  ): Promise<CreateNodeResponseDto> {
    throw new NotImplementedException();
  }

  @Get(':admin_id')
  async getNodes(
    @Param('admin_id') adminId: string,
    @Query() request: GetNodesRequestDto,
  ) {
    return {
      admin: adminId,
      request,
    };
  }

  @Patch()
  async updateNode(
    @Body() request: UpdateNodeRequestDto,
  ): Promise<UpdateNodeResponseDto> {
    throw new NotImplementedException();
  }

  @Delete()
  async deleteNode(
    @Body() request: DeleteNodeRequestDto,
  ): Promise<DeleteNodeResponseDto> {
    throw new NotImplementedException();
  }
}
