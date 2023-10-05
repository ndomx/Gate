import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CommandExecutionDto {
  @IsBoolean()
  pending: boolean;

  @IsNumber()
  timestamp: number;

  @IsInt()
  @IsOptional()
  responseCode?: number;
}
