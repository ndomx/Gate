import { IsBoolean, IsDefined, IsIn, IsInt, IsOptional, IsString, Matches } from "class-validator";
import { OpenGateRequestCodes } from "src/gates/values/error-codes";

export class OpenGateResponseDto {
  @IsBoolean()
  @IsDefined()
  success: Boolean;

  @IsInt()
  @IsOptional()
  errorCode?: number;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  @Matches(/^([a-zA-Z0-9_-]+\/?)+$/)
  topic?: string;
}
