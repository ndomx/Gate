import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { NodeDto } from 'src/nodes/dtos/node.dto';
import { UserDto } from 'src/users/dtos/user.dto';

export class UserNodesResponseDto {
  @ValidateNested()
  @Type(() => UserDto)
  @IsDefined()
  user: UserDto;

  @ValidateNested({ each: true })
  @Type(() => NodeDto)
  @IsDefined()
  nodes: NodeDto[];
}
