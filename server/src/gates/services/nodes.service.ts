import { Injectable, NotImplementedException } from '@nestjs/common';
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
    const response = new CreateNodeResponseDto();

    // validate admin
    const admin = await this.adminModel.findById(request.adminId);
    if (!admin) {
      response.success = false;
      response.errorCode = ErrorCodes.NOT_ADMIN;
      return response;
    }

    // validate root
    const root = await this.nodeModel.findById(request.rootId);
    if (!root) {
      response.success = false;
      response.errorCode = ErrorCodes.ROOT_NOT_FOUND;
      return response;
    }

    // validate admin access
    if (!admin.roots.includes(root._id.toHexString())) {
      response.success = false;
      response.errorCode = ErrorCodes.ACCESS_DENIED;
      return response;
    }

    // validate path && options
    const path = this.#getRelativePathToRoot(root, request.path);
    if (path.length === 0) {
      response.success = false;
      response.message = 'invalid path for new node';
      response.errorCode = ErrorCodes.PATH_ERROR;
      return response;
    }

    if (request.createOptions?.createIntermidiate) {
      response.success = false;
      response.message = 'feature not available yet';
      response.errorCode = ErrorCodes.GATE_ERROR;
      return response;
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
      response.success = false;
      response.message = 'path unavailable';
      response.errorCode = ErrorCodes.PATH_ERROR;
      return response;
    }

    // add node to db
    node = await this.nodeModel.create({
      parent,
      rootId: root._id.toHexString(),
      name: nodeName,
      nodeInfo: request.nodeInfo,
    });

    if (!node) {
      response.success = false;
      response.message = 'unable to save node';
      response.errorCode = ErrorCodes.DATABASE_ERROR;
      return response;
    }

    // package and return
    const createdNode = new NodeDto();
    createdNode.name = node.name;
    createdNode.parent = node.parent;
    createdNode.rootId = node.rootId;
    createdNode.nodeInfo = node.nodeInfo;
    createdNode.nodeId = node._id.toHexString();

    response.success = true;
    response.node = createdNode;
    return response;
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
    const response = new UpdateNodeResponseDto();

    // validate admin
    const admin = await this.adminModel.findById(request.adminId);
    if (!admin) {
      response.success = false;
      response.errorCode = ErrorCodes.NOT_ADMIN;
      return response;
    }

    // validate root
    const root = await this.nodeModel.findById(request.rootId);
    if (!root) {
      response.success = false;
      response.errorCode = ErrorCodes.ROOT_NOT_FOUND;
      return response;
    }

    // validate access
    if (!admin.roots.includes(root._id.toHexString())) {
      response.success = false;
      response.errorCode = ErrorCodes.ACCESS_DENIED;
      return response;
    }

    // update db
    const node = await this.nodeModel.findByIdAndUpdate(
      request.nodeId,
      request.node,
    );

    if (!node) {
      response.success = false;
      response.errorCode = ErrorCodes.NODE_NOT_FOUND;
      return response;
    }

    response.success = true;
    response.node = { ...node, nodeId: node._id.toHexString() };
    return response;
  }

  async deleteNode(
    request: DeleteNodeRequestDto,
  ): Promise<DeleteNodeResponseDto> {
    const response = new DeleteNodeResponseDto();

    // validate admin
    const admin = await this.adminModel.findById(request.adminId);
    if (!admin) {
      response.success = false;
      response.errorCode = ErrorCodes.NOT_ADMIN;
      return response;
    }

    // validate root
    const root = await this.nodeModel.findById(request.rootId);
    if (!root) {
      response.success = false;
      response.errorCode = ErrorCodes.ROOT_NOT_FOUND;
      return response;
    }

    // validate access
    if (!admin.roots.includes(root._id.toHexString())) {
      response.success = false;
      response.errorCode = ErrorCodes.ACCESS_DENIED;
      return response;
    }

    // update db
    const node = await this.nodeModel.findByIdAndDelete(request.nodeId);
    if (!node) {
      response.success = false;
      response.errorCode = ErrorCodes.NODE_NOT_FOUND;
      return response;
    }

    // package and return
    response.success = true;
    response.node = { ...node, nodeId: node._id.toHexString() };
    return response;
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
}
