import { ArrayMinSize, IsArray } from 'class-validator';

export class AddAccessRequestDto {
  @IsArray()
  @ArrayMinSize(1)
  nodes: string[];
}
