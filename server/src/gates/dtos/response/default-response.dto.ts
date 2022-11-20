import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class DefaultResponseDto {
  @IsBoolean()
  @IsDefined()
  success: Boolean;

  @IsInt()
  @IsOptional()
  @Expose({ name: 'error_code' })
  errorCode?: number;

  @IsString()
  @IsOptional()
  message?: string;
}
