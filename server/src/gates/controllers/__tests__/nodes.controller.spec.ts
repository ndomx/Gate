import { Test } from '@nestjs/testing';
import { CreateNodeRequestDto } from '../../dtos/request/create-node-request.dto';
import { DeleteNodeRequestDto } from '../../dtos/request/delete-node-request.dto';
import { GetNodesRequestDto } from '../../dtos/request/get-nodes-request.dto';
import { UpdateNodeRequestDto } from '../../dtos/request/update-node-request.dto';
import { CreateNodeResponseDto } from '../../dtos/response/create-node-response.dto';
import { DeleteNodeResponseDto } from '../../dtos/response/delete-node-response.dto';
import { GetNodesResponseDto } from '../../dtos/response/get-nodes-response.dto';
import { UpdateNodeResponseDto } from '../../dtos/response/update-node-response.dto';
import { NodesService } from '../../services/nodes.service';
import { NodesController } from '../nodes.controller';

const mockNodesService = {
  createNode: jest.fn(() => Promise.resolve(new CreateNodeResponseDto())),
  getNodes: jest.fn(() => Promise.resolve(new GetNodesResponseDto())),
  updateNode: jest.fn(() => Promise.resolve(new UpdateNodeResponseDto())),
  deleteNode: jest.fn(() => Promise.resolve(new DeleteNodeResponseDto())),
};

describe('NodesController', () => {
  let controller: NodesController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: NodesService,
          useValue: mockNodesService,
        },
      ],
      controllers: [NodesController],
    }).compile();

    controller = module.get(NodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createNode()', () => {
    const request = new CreateNodeRequestDto();

    it('calls createNode in service', async () => {
      await controller.createNode(request);
      expect(mockNodesService.createNode).toHaveBeenCalledWith(request);
    });
  });

  describe('getNodes()', () => {
    const adminId = '123';
    const request = new GetNodesRequestDto();

    it('calls getNodes in service', async () => {
      await controller.getNodes(adminId, request);
      expect(mockNodesService.getNodes).toHaveBeenCalledWith(adminId, request);
    });
  });

  describe('updateNode()', () => {
    const request = new UpdateNodeRequestDto();

    it('calls updateNodes in service', async () => {
      await controller.updateNode(request);
      expect(mockNodesService.updateNode).toHaveBeenCalledWith(request);
    });
  });

  describe('deleteNodes()', () => {
    const request = new DeleteNodeRequestDto();

    it('calls createNode in service', async () => {
      await controller.deleteNode(request);
      expect(mockNodesService.deleteNode).toHaveBeenCalledWith(request);
    });
  });
});
