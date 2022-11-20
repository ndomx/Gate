import { IsOptional, IsString, Matches } from 'class-validator';
import { DefaultResponseDto } from './default-response.dto';

export class OpenGateResponseDto extends DefaultResponseDto {
  @IsString()
  @IsOptional()
  @Matches(/^([a-zA-Z0-9_-]+\/?)+$/)
  topic?: string;
}
