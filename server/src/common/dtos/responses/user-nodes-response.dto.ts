import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { NodeResponseDto } from 'src/nodes/dtos/responses';
import { UserResponseDto } from 'src/users/dtos/responses';

export class UserNodesResponseDto {
  @ValidateNested()
  @Type(() => UserResponseDto)
  @IsDefined()
  user: UserResponseDto;

  @ValidateNested()
  @Type(() => UserResponseDto)
  @IsDefined()
  nodes: NodeResponseDto[];
}
