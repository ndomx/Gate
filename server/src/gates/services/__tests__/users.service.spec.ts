import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { Node } from 'src/gates/schemas/node.shema';
import { User } from 'src/gates/schemas/user.schema';
import { UsersService } from '../users.service';

const _id = new Types.ObjectId();

const userMock: User & { _id: Types.ObjectId; userId: string } = {
  name: 'user',
  last: 'user',
  access: [{ rootId: '231789', prefix: '' }],
  admin: [{ rootId: '231789', prefix: '' }],
  userId: _id.toHexString(),
  _id,
};

const nodeMock: Node = {
  name: 'node',
  parent: '',
  isDevice: true,
};

const nodeModelMock = {
  findById: jest.fn(),
};

const userModelMock = {
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('Node'),
          useValue: nodeModelMock,
        },
        {
          provide: getModelToken('User'),
          useValue: userModelMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById()', () => {
    describe('when user is found', () => {
      beforeEach(() => {
        userModelMock.findById.mockResolvedValueOnce(userMock);
      });

      it('returns a user', async () => {
        const user = await service.getUserById('123');
        expect(user).toStrictEqual(userMock);
      });
    });

    describe('when user is not found', () => {
      beforeEach(() => {
        userModelMock.findById.mockResolvedValueOnce(null);
      });

      it('throws an exception', () => {
        expect(() => service.getUserById('123')).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });

  describe('addUser()', () => {
    ['admin', 'access'].forEach((label) => {
      describe(`when ${label} does not have valid root`, () => {
        beforeEach(() => {
          nodeModelMock.findById.mockResolvedValueOnce(null);
        });

        it('throws an exception', () => {
          expect(() => service.addUser(userMock)).rejects.toThrow(
            BadRequestException,
          );
        });
      });

      describe(`when ${label} prefix is invalid`, () => {
        const userData = { ...userMock };
        userData[label] = [{ rootId: '123', prefix: '&%#88\\/' }];

        it('throws an exception', () => {
          expect(() => service.addUser(userData)).rejects.toThrow(
            BadRequestException,
          );
        });
      });
    });

    describe('when user is created', () => {
      beforeEach(() => {
        userModelMock.create.mockResolvedValueOnce({
          ...userMock,
          userId: userMock._id.toHexString(),
        });
      });

      it('returns the user', async () => {
        const user = await service.addUser(userMock);
        expect(user).toStrictEqual(userMock);
      });
    });

    describe('when user is not created', () => {
      beforeEach(() => {
        userModelMock.create.mockResolvedValueOnce(null);
      });

      it('throws an exception', () => {
        expect(() => service.addUser(userMock)).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });
  });

  describe('updateUser()', () => {
    ['admin', 'access'].forEach((label) => {
      describe(`when ${label} does not have valid root`, () => {
        beforeEach(() => {
          nodeModelMock.findById.mockResolvedValueOnce(null);
        });

        it('throws an exception', () => {
          expect(() => service.addUser(userMock)).rejects.toThrow(
            BadRequestException,
          );
        });
      });

      describe(`when ${label} prefix is invalid`, () => {
        const userData = { ...userMock };
        userData[label] = [{ rootId: '123', prefix: '&%#88\\/' }];

        it('throws an exception', () => {
          expect(() => service.addUser(userData)).rejects.toThrow(
            BadRequestException,
          );
        });
      });
    });

    describe('when user is updated', () => {
      beforeEach(() => {
        userModelMock.findByIdAndUpdate.mockResolvedValueOnce(userMock);
      });

      it('returns the user', async () => {
        const user = await service.updateUser('123', userMock);
        expect(user).toStrictEqual(userMock);
      });
    });

    describe('when user is not found', () => {
      beforeEach(() => {
        userModelMock.create.mockResolvedValueOnce(null);
      });

      it('throws an exception', () => {
        expect(() => service.addUser(userMock)).rejects.toThrow(
          InternalServerErrorException,
        );
      });
    });
  });

  describe('deleteUser()', () => {
    describe('when user is found', () => {
      beforeEach(() => {
        userModelMock.findByIdAndDelete.mockResolvedValueOnce(userMock);
      });

      it('returns a user', async () => {
        const user = await service.deleteUser('123');
        expect(user).toStrictEqual(userMock);
      });
    });

    describe('when user is not found', () => {
      beforeEach(() => {
        userModelMock.findById.mockResolvedValueOnce(null);
      });

      it('throws an exception', () => {
        expect(() => service.getUserById('123')).rejects.toThrow(
          NotFoundException,
        );
      });
    });
  });
});
