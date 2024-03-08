import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { Node } from 'src/nodes/interfaces/node.interface';
import { UserDto } from 'src/users/dtos';

export class UserNodesResponseDto {
  @ValidateNested()
  @Type(() => UserDto)
  @IsDefined()
  user: UserDto;

  @IsDefined()
  nodes: Node[];
}
