import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { NodeDto } from 'src/nodes/dtos/node.dto';
import { PublicUserDto } from 'src/users-client/dtos/public-user.dto';

export class UserNodesResponseDto {
  @ValidateNested()
  @Type(() => PublicUserDto)
  @IsDefined()
  user: PublicUserDto;

  @ValidateNested({ each: true })
  @Type(() => NodeDto)
  @IsDefined()
  nodes: NodeDto[];
}
