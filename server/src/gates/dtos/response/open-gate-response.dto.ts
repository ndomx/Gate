import { IsString, Matches } from 'class-validator';

export class OpenGateResponseDto {
  @IsString()
  @Matches(/^([a-zA-Z0-9_-]+\/?)+$/)
  topic: string;
}
