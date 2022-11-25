import {
  Injectable,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
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

    // validate path
    const path = this.#getPathFromRoot(root, request.path);
    const nodeName = path.pop();

    const parent = await this.#findByPath(path);

    // add node to db
    const node = await this.nodeModel.create({
      parent: parent._id.toHexString(),
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
    // validate admin
    const admin = await this.adminModel.findById(adminId);
    if (!admin) {
      throw new ForbiddenException({ error_code: ErrorCodes.NOT_ADMIN });
    }

    if (!request.path) {
      const response = new GetNodesResponseDto();
      const nodes = await this.nodeModel.find({
        _id: { $in: admin.roots },
      });
      response.nodes = nodes.map((node) => this.#mapNodeFromSchema(node));

      return response;
    }

    const path = request.path.split('/');
    const next = await this.#findByPath(path);
    const nodes = await this.#findChildren(next);

    const response = new GetNodesResponseDto();
    response.nodes = nodes;

    return response;
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

  async #findChildren(startingNode: NodeDocument): Promise<NodeDto[]> {
    const children = await this.nodeModel.find({
      parent: startingNode._id,
    });

    let nodes = [this.#mapNodeFromSchema(startingNode)];
    for (const child of children) {
      const childNodes = await this.#findChildren(child);
      nodes = nodes.concat(childNodes);
    }

    return nodes;
  }
}
