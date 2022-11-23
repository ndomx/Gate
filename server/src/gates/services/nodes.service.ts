import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NodeDto } from '../dtos/common/node.dto';
import { CreateNodeRequestDto } from '../dtos/request/create-node-request.dto';
import { DeleteNodeRequestDto } from '../dtos/request/delete-node-request.dto';
import { GetNodesRequestDto } from '../dtos/request/get-nodes-request.dto';
import { UpdateNodeRequestDto } from '../dtos/request/update-node-request.dto';
import { CreateNodeResponseDto } from '../dtos/response/create-node-response.dto';
import { DeleteNodeResponseDto } from '../dtos/response/delete-node-response.dto';
import { GetNodesResponseDto } from '../dtos/response/get-nodes-response.dto';
import { UpdateNodeResponseDto } from '../dtos/response/update-node-response.dto';
import { Admin, AdminDocument } from '../schemas/admin.schema';
import { Node, NodeDocument } from '../schemas/node.shema';
import { ErrorCodes } from '../values/error-codes';

@Injectable()
export class NodesService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(Node.name) private nodeModel: Model<NodeDocument>,
  ) {}

  async createNode(
    request: CreateNodeRequestDto,
  ): Promise<CreateNodeResponseDto> {
    // validate admin
    const admin = await this.adminModel.findById(request.adminId);
    if (!admin) {
      throw new ForbiddenException({ error_code: ErrorCodes.NOT_ADMIN });
    }

    // validate root
    const root = await this.nodeModel.findById(request.rootId);
    if (!root) {
      throw new BadRequestException({ error_code: ErrorCodes.ROOT_NOT_FOUND });
    }

    // validate admin access
    if (!admin.roots.includes(root._id.toHexString())) {
      throw new ForbiddenException({ error_code: ErrorCodes.ACCESS_DENIED });
    }

    // validate path && options
    const path = this.#getRelativePathToRoot(root, request.path);
    if (path.length === 0) {
      throw new BadRequestException({
        message: 'invalid path for new node',
        error_code: ErrorCodes.PATH_ERROR,
      });
    }

    const nodeName = path.pop();
    let node = root;
    let parent = root._id.toHexString();
    for (const loc of path) {
      node = await this.nodeModel.findOne({ parent, name: loc });
      if (!node) {
        break;
      }

      parent = node._id.toHexString();
    }

    if (!node) {
      throw new BadRequestException({
        message: 'path unavailable',
        error_code: ErrorCodes.PATH_ERROR,
      });
    }

    // add node to db
    node = await this.nodeModel.create({
      parent,
      rootId: root._id.toHexString(),
      name: nodeName,
      nodeInfo: request.nodeInfo,
    });

    if (!node) {
      throw new InternalServerErrorException({
        message: 'unable to save node',
        error_code: ErrorCodes.DATABASE_ERROR,
      });
    }

    // package and return
    return this.#mapNodeFromSchema(node);
  }

  async getNodes(
    adminId: string,
    request: GetNodesRequestDto,
  ): Promise<GetNodesResponseDto> {
    throw new NotImplementedException();
  }

  async updateNode(
    request: UpdateNodeRequestDto,
  ): Promise<UpdateNodeResponseDto> {
    // validate admin
    const admin = await this.adminModel.findById(request.adminId);
    if (!admin) {
      throw new ForbiddenException({ error_code: ErrorCodes.NOT_ADMIN });
    }

    // validate root
    const root = await this.nodeModel.findById(request.rootId);
    if (!root) {
      throw new BadRequestException({ error_code: ErrorCodes.ROOT_NOT_FOUND });
    }

    // validate access
    if (!admin.roots.includes(root._id.toHexString())) {
      throw new ForbiddenException({ error_code: ErrorCodes.ACCESS_DENIED });
    }

    // update db
    const node = await this.nodeModel.findByIdAndUpdate(
      request.nodeId,
      request.node,
    );

    if (!node) {
      throw new ForbiddenException({ error_code: ErrorCodes.NODE_NOT_FOUND });
    }

    // package and return
    return this.#mapNodeFromSchema(node);
  }

  async deleteNode(
    request: DeleteNodeRequestDto,
  ): Promise<DeleteNodeResponseDto> {
    const response = new DeleteNodeResponseDto();

    // validate admin
    const admin = await this.adminModel.findById(request.adminId);
    if (!admin) {
      throw new ForbiddenException({ error_code: ErrorCodes.NOT_ADMIN });
    }

    // validate root
    const root = await this.nodeModel.findById(request.rootId);
    if (!root) {
      throw new BadRequestException({ error_code: ErrorCodes.ROOT_NOT_FOUND });
    }

    // validate access
    if (!admin.roots.includes(root._id.toHexString())) {
      throw new ForbiddenException({ error_code: ErrorCodes.ACCESS_DENIED });
    }

    // update db
    const node = await this.nodeModel.findByIdAndDelete(request.nodeId);
    if (!node) {
      throw new ForbiddenException({ error_code: ErrorCodes.NODE_NOT_FOUND });
    }

    // package and return
    return this.#mapNodeFromSchema(node);
  }

  #getRelativePathToRoot(root: Node, path: string): string[] {
    const pathList = path.split('/');
    if (pathList.length === 0) {
      return [];
    }

    if (root.name === pathList[0]) {
      if (pathList.length === 1) {
        return [];
      } else {
        return pathList.slice(1);
      }
    }

    return pathList;
  }

  #mapNodeFromSchema(nodeDocument: NodeDocument): NodeDto {
    const node = new NodeDto();
    node.name = nodeDocument.name;
    node.parent = nodeDocument.parent;
    node.children = nodeDocument.children;
    node.rootId = nodeDocument.rootId;
    node.nodeInfo = nodeDocument.nodeInfo;
    node.nodeId = nodeDocument._id.toHexString();

    return node;
  }
}
