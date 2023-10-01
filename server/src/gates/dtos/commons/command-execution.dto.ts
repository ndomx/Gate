import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsNumber, IsString } from 'class-validator';

export class CommandExecutionDto {
  @IsString()
  state: string;

  @IsNumber()
  timestamp: number;
}
