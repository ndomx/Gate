import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User } from '../../schemas/user.schema';
import { Node } from '../../schemas/node.shema';
import { OpenGateRequestDto } from '../../dtos/request/open-gate-request.dto';
import { OpenGateRequestCodes } from '../../values/error-codes';
import { GatesService } from '../gates.service';
import { MqttService } from '../mqtt.service';
import { Mongoose, Types } from 'mongoose';

const userMock: User = {
  name: 'user',
  last: 'user',
  access: [{ rootId: '231789', prefix: '' }],
  admin: [{ rootId: '231789', prefix: '' }],
};

const nodeMock: Node & { _id: Types.ObjectId } = {
  name: 'node',
  parent: '',
  isDevice: true,
  _id: new Types.ObjectId(),
};

const mqttServiceMock = {
  open: jest.fn(),
};

const nodeModelMock = {
  findById: jest.fn((_id) => Promise.resolve(nodeMock)),
};

const userModelMock = {
  findById: jest.fn((_id) => Promise.resolve(userMock)),
};

describe('GatesService', () => {
  let service: GatesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GatesService,
        {
          provide: getModelToken('Node'),
          useValue: nodeModelMock,
        },
        {
          provide: getModelToken('User'),
          useValue: userModelMock,
        },
        {
          provide: MqttService,
          useValue: mqttServiceMock,
        },
      ],
    }).compile();

    service = await module.resolve(GatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('requestAccess()', () => {
    const request: OpenGateRequestDto = {
      userId: '1',
      rootId: '1',
      deviceId: '2',
      timestamp: Date.now(),
    };

    describe('when user is not found', () => {
      beforeEach(() => {
        userModelMock.findById.mockResolvedValueOnce(null);
      });

      it('returns USER_NOT_FOUND error', async () => {
        const result = await service.requestAccess(request);
        expect(result.success).toBeFalsy();
        expect(result.errorCode).toStrictEqual(
          OpenGateRequestCodes.USER_NOT_FOUND,
        );
      });
    });

    describe('when user does not have access to root', () => {
      it('returns ACCESS_DENIED error', async () => {
        const result = await service.requestAccess(request);
        expect(result.success).toBeFalsy();
        expect(result.errorCode).toStrictEqual(
          OpenGateRequestCodes.ACCESS_DENIED,
        );
      });
    });

    describe('when device is not found', () => {
      beforeEach(() => {
        userModelMock.findById.mockResolvedValueOnce({
          ...userMock,
          access: [
            {
              rootId: '1',
              prefix: '',
            },
          ],
        });

        nodeModelMock.findById.mockResolvedValueOnce(null);
      });

      it('returns DEVICE_NOT_FOUND error', async () => {
        const result = await service.requestAccess(request);
        expect(result.success).toBeFalsy();
        expect(result.errorCode).toStrictEqual(
          OpenGateRequestCodes.DEVICE_NOT_FOUND,
        );
      });
    });

    describe('when node is not a device', () => {
      beforeEach(() => {
        userModelMock.findById.mockResolvedValueOnce({
          ...userMock,
          access: [
            {
              rootId: '1',
              prefix: '',
            },
          ],
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          ...nodeMock,
          isDevice: false,
        });
      });

      it('returns NOT_DEVICE error', async () => {
        const result = await service.requestAccess(request);
        expect(result.success).toBeFalsy();
        expect(result.errorCode).toStrictEqual(OpenGateRequestCodes.NOT_DEVICE);
      });
    });

    describe('when device is not child of root', () => {
      beforeEach(() => {
        userModelMock.findById.mockResolvedValueOnce({
          ...userMock,
          access: [
            {
              rootId: '1',
              prefix: '',
            },
          ],
        });
      });

      it('returns ROOT_NOT_FOUND error', async () => {
        const result = await service.requestAccess(request);
        expect(result.success).toBeFalsy();
        expect(result.errorCode).toStrictEqual(
          OpenGateRequestCodes.ROOT_NOT_FOUND,
        );
      });
    });

    describe('when device does not match the prefix', () => {
      const rootId = new Types.ObjectId();

      const newRequest = {
        ...request,
        rootId: rootId.toHexString(),
      };

      beforeEach(() => {
        userModelMock.findById.mockResolvedValueOnce({
          ...userMock,
          access: [
            {
              rootId: newRequest.rootId,
              prefix: 'other/node',
            },
          ],
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          ...nodeMock,
          parent: '1',
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          name: 'parent',
          parent: '',
          isDevice: false,
          _id: rootId,
        });
      });

      it('returns ACCESS_DENIED error', async () => {
        const result = await service.requestAccess(newRequest);
        expect(result.success).toBeFalsy();
        expect(result.errorCode).toStrictEqual(
          OpenGateRequestCodes.ACCESS_DENIED,
        );
      });
    });

    describe('when request is successful', () => {
      const rootId = new Types.ObjectId();

      const newRequest = {
        ...request,
        rootId: rootId.toHexString(),
      };

      beforeEach(() => {
        userModelMock.findById.mockResolvedValueOnce({
          ...userMock,
          access: [
            {
              rootId: newRequest.rootId,
              prefix: 'parent/node',
            },
          ],
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          ...nodeMock,
          parent: '1',
        });

        nodeModelMock.findById.mockResolvedValueOnce({
          name: 'parent',
          parent: '',
          isDevice: false,
          _id: rootId,
        });
      });

      it('returns a successful object', async () => {
        const result = await service.requestAccess(newRequest);
        expect(result.success).toBeTruthy();
        expect(result.topic).toStrictEqual('parent/node');
      });
    });
  });
});
