import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from '../schemas/admin.schema';
import { Node, NodeDocument } from '../schemas/node.shema';

@Injectable()
export class NodesService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    @InjectModel(Node.name) private nodeModel: Model<NodeDocument>,
  ) {}
}
