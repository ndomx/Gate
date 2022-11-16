import { Test, TestingModule } from '@nestjs/testing';
import { AddUserResponseDto } from '../../dtos/response/add-user-response.dto';
import { DeleteUserResponseDto } from '../../dtos/response/delete-user-response.dto';
import { GetUserResponseDto } from '../../dtos/response/get-user-response.dto';
import { UpdateUserResponseDto } from '../../dtos/response/update-user-response.dto';
import { UsersService } from '../../services/users.service';
import { UsersController } from '../users.controller';

const usersServiceMock = {
  addUser: jest.fn((_body) => Promise.resolve(new AddUserResponseDto())),
  findUserById: jest.fn((_id) => Promise.resolve(new GetUserResponseDto())),
  updateUser: jest.fn((_id, _body) =>
    Promise.resolve(new UpdateUserResponseDto()),
  ),
  deleteUser: jest.fn((_id) => Promise.resolve(new DeleteUserResponseDto())),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          useValue: usersServiceMock,
          provide: UsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addUser()', () => {});

  describe('getUser()', () => {});

  describe('updateUser()', () => {});

  describe('deleteUser()', () => {});
});
