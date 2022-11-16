import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPermissionsDto } from '../dtos/common/user-permissions.dto';
import { AddUserRequestDto } from '../dtos/request/add-user-request.dto';
import { UpdateUserRequestDto } from '../dtos/request/update-user-request.dto';
import { AddUserResponseDto } from '../dtos/response/add-user-response.dto';
import { DeleteUserResponseDto } from '../dtos/response/delete-user-response.dto';
import { GetUserResponseDto } from '../dtos/response/get-user-response.dto';
import { UpdateUserResponseDto } from '../dtos/response/update-user-response.dto';
import { Node, NodeDocument } from '../schemas/node.shema';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Node.name) private nodeModel: Model<NodeDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getUserById(userId: string): Promise<GetUserResponseDto> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async addUser(userData: AddUserRequestDto): Promise<AddUserResponseDto> {
    this.#assertPermissions('admin', userData.admin);
    this.#assertPermissions('access', userData.access);

    const user = await this.userModel.create(userData);
    if (!user) {
      throw new InternalServerErrorException('Could not create user');
    }

    return {
      ...user,
      userId: user._id.toHexString(),
    };
  }

  async updateUser(
    userId: string,
    userData: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    this.#assertPermissions('admin', userData.admin);
    this.#assertPermissions('access', userData.access);

    const user = await this.userModel.findByIdAndUpdate(userId, userData);
    if (!user) {
      throw new NotFoundException('Could not find any user');
    }

    return user;
  }

  async deleteUser(userId: string): Promise<DeleteUserResponseDto> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new InternalServerErrorException('Unable to delete user');
    }

    return user;
  }

  #assertPermissions(label: string, permissions?: UserPermissionsDto[]) {
    permissions?.forEach(async (p) => {
      const node = await this.nodeModel.findById(p.rootId);
      if (!node) {
        throw new BadRequestException(`Could not find root for ${label}`);
      }

      if (!p.prefix.match(/^([a-zA-Z0-9]\/?)*$/)) {
        throw new BadRequestException(`Incorrect prefix format for ${label}`);
      }
    });
  }
}
