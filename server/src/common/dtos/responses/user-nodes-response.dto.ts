import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { NodeDto } from 'src/nodes/dtos';
import { UserDto } from 'src/users/dtos';

export class UserNodesResponseDto {
  @ValidateNested()
  @Type(() => UserDto)
  @IsDefined()
  user: UserDto;

  @IsDefined()
  nodes: NodeDto[];
}
