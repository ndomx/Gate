import {
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { UpdateNodeRequestDto } from '../../dtos/request/update-node-request.dto';
import { CreateNodeRequestDto } from '../../dtos/request/create-node-request.dto';
import { DeleteNodeRequestDto } from '../../dtos/request/delete-node-request.dto';
import { Admin } from '../../schemas/admin.schema';
import { Node } from '../../schemas/node.shema';
import { ErrorCodes } from '../../values/error-codes';
import { NodesService } from '../nodes.service';

const adminMock: Admin = {
  password: '78',
  personId: '1232',
  roots: ['12398'],
  username: 'user',
};

const nodeMock: Node & { _id: Types.ObjectId } = {
  name: 'root',
  nodeInfo: {
    isDevice: true,
  },
  parent: '',
  rootId: '12398',
  _id: new Types.ObjectId(),
};

const adminModelMock = {
  findById: jest.fn(() => Promise.resolve(adminMock)),
};

const nodeModelMock = {
  create: jest.fn(() => Promise.resolve(nodeMock)),
  findById: jest.fn(() => Promise.resolve(nodeMock)),
  findOne: jest.fn(() => Promise.resolve(nodeMock)),
  findByIdAndUpdate: jest.fn(() => Promise.resolve(nodeMock)),
  findByIdAndDelete: jest.fn(() => Promise.resolve(nodeMock)),
};

describe('NodesService', () => {
  let service: NodesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        NodesService,
        {
          provide: getModelToken(Admin.name),
          useValue: adminModelMock,
        },
        {
          provide: getModelToken(Node.name),
          useValue: nodeModelMock,
        },
      ],
    }).compile();

    service = await module.resolve(NodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNode()', () => {
    const request: CreateNodeRequestDto = {
      adminId: '1232',
      nodeInfo: {
        isDevice: true,
      },
      path: 'root/node',
      rootId: '12398',
    };

    describe('when admin is invalid', () => {
      beforeEach(() => {
        adminModelMock.findById.mockResolvedValueOnce(null);
      });

      it('returns a NOT_ADMIN error', () => {
        expect(() => service.createNode(request)).rejects.toThrow(
          ForbiddenException,
        );
      });
    });

    describe('when root is invalid', () => {
      beforeEach(() => {
        nodeModelMock.findById.mockResolvedValueOnce(null);
      });

      it('returns a ROOT_NOT_FOUND_ERROR', () => {
        expect(() => service.createNode(request)).rejects.toThrow(
          BadRequestException,
        );
      });
    });

    describe('when admin does not have access to root', () => {
      it('returns a ACCESS_DENIED error', () => {
        expect(() => service.createNode(request)).rejects.toThrow(
          ForbiddenException,
        );
      });
    });

    describe('when path is invalid', () => {
      const rootId = new Types.ObjectId();
      const invalidRequest: CreateNodeRequestDto = {
        ...request,
        path: 'root',
      };

      beforeEach(() => {
        adminModelMock.findById.mockResolvedValueOnce({
          ...adminMock,
          roots: [rootId.toHexString()],
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          ...nodeMock,
          _id: rootId,
        });
      });

      it('returns a PATH_ERROR', () => {
        expect(() => service.createNode(request)).rejects.toThrow(
          BadRequestException,
        );
      });
    });

    describe('when path is unavailable', () => {
      const rootId = new Types.ObjectId();
      const nodeId = new Types.ObjectId();
      const invalidRequest: CreateNodeRequestDto = {
        ...request,
        path: 'root/node/other/device',
      };

      beforeEach(() => {
        adminModelMock.findById.mockResolvedValueOnce({
          ...adminMock,
          roots: [rootId.toHexString()],
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          ...nodeMock,
          _id: rootId,
        });

        nodeModelMock.findOne.mockResolvedValueOnce({
          ...nodeMock,
          _id: nodeId,
          parent: rootId.toHexString(),
        });

        nodeModelMock.findOne.mockResolvedValueOnce(null);
      });

      it('returns a PATH_ERROR', () => {
        expect(() => service.createNode(request)).rejects.toThrow(
          BadRequestException,
        );
      });
    });

    describe('when db throws error', () => {
      const rootId = new Types.ObjectId();

      beforeEach(() => {
        adminModelMock.findById.mockResolvedValueOnce({
          ...adminMock,
          roots: [rootId.toHexString()],
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          ...nodeMock,
          _id: rootId,
        });

        nodeModelMock.create.mockResolvedValueOnce(null);
      });

      it('returns a PATH_ERROR', () => {
        expect(() => service.createNode(request)).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    describe('when creation is successful', () => {
      const rootId = new Types.ObjectId();

      beforeEach(() => {
        adminModelMock.findById.mockResolvedValueOnce({
          ...adminMock,
          roots: [rootId.toHexString()],
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          ...nodeMock,
          _id: rootId,
        });

        nodeModelMock.create.mockResolvedValueOnce({
          ...nodeMock,
          parent: rootId.toHexString(),
          rootId: rootId.toHexString(),
          name: 'node',
        });
      });

      it('returns success', async () => {
        const result = await service.createNode(request);

        expect(result.rootId).toStrictEqual(rootId.toHexString());
        expect(result.parent).toStrictEqual(rootId.toHexString());
        expect(result.name).toStrictEqual('node');
      });
    });
  });

  describe('getNodes()', () => {});

  describe('updateNode()', () => {
    const request = new UpdateNodeRequestDto();

    describe('when admin is invalid', () => {
      beforeEach(() => {
        adminModelMock.findById.mockResolvedValueOnce(null);
      });

      it('returns a NOT_ADMIN error', () => {
        expect(() => service.updateNode(request)).rejects.toThrow(
          ForbiddenException,
        );
      });
    });

    describe('when root is invalid', () => {
      beforeEach(() => {
        nodeModelMock.findById.mockResolvedValueOnce(null);
      });

      it('returns a ROOT_NOT_FOUND_ERROR', () => {
        expect(() => service.updateNode(request)).rejects.toThrow(
          BadRequestException,
        );
      });
    });

    describe('when admin does not have access to root', () => {
      it('returns a ACCESS_DENIED error', () => {
        expect(() => service.updateNode(request)).rejects.toThrow(
          ForbiddenException,
        );
      });
    });

    describe('when db throws error', () => {
      const rootId = new Types.ObjectId();

      beforeEach(() => {
        adminModelMock.findById.mockResolvedValueOnce({
          ...adminMock,
          roots: [rootId.toHexString()],
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          ...nodeMock,
          _id: rootId,
        });

        nodeModelMock.findByIdAndUpdate.mockResolvedValueOnce(null);
      });

      it('returns a NODE_NOT_FOUND error', () => {
        expect(() => service.updateNode(request)).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    describe('when update is successful', () => {
      const rootId = new Types.ObjectId();
      const updateRequest: UpdateNodeRequestDto = {
        ...request,
        node: {
          name: 'new-node-name',
        },
      };

      beforeEach(() => {
        adminModelMock.findById.mockResolvedValueOnce({
          ...adminMock,
          roots: [rootId.toHexString()],
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          ...nodeMock,
          _id: rootId,
        });

        nodeModelMock.findByIdAndUpdate.mockResolvedValueOnce({
          ...nodeMock,
          name: updateRequest.node.name,
        });
      });

      it('returns success', async () => {
        const result = await service.updateNode(updateRequest);
        expect(result.name).toStrictEqual('new-node-name');
      });
    });
  });

  describe('deleteNode()', () => {
    const request = new DeleteNodeRequestDto();

    describe('when admin is invalid', () => {
      beforeEach(() => {
        adminModelMock.findById.mockResolvedValueOnce(null);
      });

      it('returns a NOT_ADMIN error', () => {
        expect(() => service.deleteNode(request)).rejects.toThrow(
          ForbiddenException,
        );
      });
    });

    describe('when root is invalid', () => {
      beforeEach(() => {
        nodeModelMock.findById.mockResolvedValueOnce(null);
      });

      it('returns a ROOT_NOT_FOUND_ERROR', () => {
        expect(() => service.deleteNode(request)).rejects.toThrow(
          BadRequestException,
        );
      });
    });

    describe('when admin does not have access to root', () => {
      it('returns a ACCESS_DENIED error', () => {
        expect(() => service.deleteNode(request)).rejects.toThrow(
          ForbiddenException,
        );
      });
    });

    describe('when db throws error', () => {
      const rootId = new Types.ObjectId();

      beforeEach(() => {
        adminModelMock.findById.mockResolvedValueOnce({
          ...adminMock,
          roots: [rootId.toHexString()],
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          ...nodeMock,
          _id: rootId,
        });

        nodeModelMock.findByIdAndDelete.mockResolvedValueOnce(null);
      });

      it('returns a NODE_NOT_FOUND error', () => {
        expect(() => service.deleteNode(request)).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });

    describe('when delete is successful', () => {
      const rootId = new Types.ObjectId();

      beforeEach(() => {
        adminModelMock.findById.mockResolvedValueOnce({
          ...adminMock,
          roots: [rootId.toHexString()],
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          ...nodeMock,
          _id: rootId,
        });
      });

      it('returns success', async () => {
        const result = await service.deleteNode(request);
        expect(result.nodeId).toStrictEqual(nodeMock._id.toHexString());
      });
    });
  });
});
