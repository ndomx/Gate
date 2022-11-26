import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Admin, AdminDocument } from '../schemas/admin.schema';
import { CreateUserRequestDto } from '../dtos/request/create-user-request.dto';
import { CreateUserResponseDto } from '../dtos/response/create-user-response.dro';
import { ErrorCodes } from '../values/error-codes';
import { Node, NodeDocument } from '../schemas/node.shema';
import { Person, PersonDocument } from '../schemas/person.schema';
import { UserDto } from '../dtos/common/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Person.name)
    private readonly personModel: Model<PersonDocument>,
    @InjectModel(Node.name) private readonly nodeModel: Model<NodeDocument>,
  ) {}

  async createUser(
    request: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    // validate admin
    const admin = await this.adminModel.findById(request.adminId);
    if (!admin) {
      throw new ForbiddenException({
        error_code: ErrorCodes.ACCESS_DENIED,
      });
    }

    // validate admin access
    const root = await this.nodeModel.findOne({
      $and: [{ _id: { $in: admin.roots } }, { _id: request.rootId }],
    });

    if (!root) {
      throw new ForbiddenException({
        error_code: ErrorCodes.ACCESS_DENIED,
        message: 'Admin does not have access to root',
      });
    }

    // validate path
    for (const path of request.access) {
      const pathList = this.#getPathFromRoot(root, path);
      await this.#findByPath(pathList);
    }

    // create person
    const person = await this.personModel.create({
      name: request.person.name,
      last: request.person.last,
    });

    // create user
    const user = await this.userModel.create({
      personId: person._id.toHexString(),
      rootId: root._id.toHexString(),
      access: request.access,
    });

    // package & return
    return this.#dtoFromSchema(user);
  }

  #dtoFromSchema(userDocument: UserDocument): UserDto {
    const user = new UserDto();
    user.userId = userDocument._id.toHexString();
    user.personId = userDocument.personId;
    user.rootId = userDocument.rootId;
    user.access = userDocument.access;

    return user;
  }

  async #findByPath(path: string[]): Promise<NodeDocument> {
    let next: NodeDocument;
    let parent = '';

    for (const loc of path) {
      next = await this.nodeModel.findOne({
        parent,
        name: loc,
      });

      if (!next) {
        throw new BadRequestException({
          error_code: ErrorCodes.PATH_ERROR,
          message: 'invalid path',
        });
      }

      parent = next._id.toHexString();
    }

    return next;
  }

  #getPathFromRoot(root: Node, path: string): string[] {
    path = path.trim().replace(/^\/+/, '').replace(/\/+$/, '');

    const pathList = path.split('/');
    if (!pathList[0]) {
      throw new BadRequestException({
        message: 'path cannot be empty',
        error_code: ErrorCodes.PATH_ERROR,
      });
    }

    if (root.name !== pathList[0]) {
      // path is relative, should start with root
      pathList.splice(0, 0, root.name);
    }

    return pathList;
  }
}
