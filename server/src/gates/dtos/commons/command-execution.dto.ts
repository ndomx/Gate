import { IsBoolean, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CommandExecutionDto {
  @IsBoolean()
  pending: boolean;

  @IsNumber()
  startedAt: number;

  @IsInt()
  @IsOptional()
  responseCode?: number;

  @IsNumber()
  timeout: number;
}
