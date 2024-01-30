import { IsDefined } from 'class-validator';
import { Node } from 'src/nodes/interfaces/node.interface';
import { User } from 'src/users/interfaces/user.interface';

export class UserNodesResponseDto {
  @IsDefined()
  user: User;

  @IsDefined()
  nodes: Node[];
}
