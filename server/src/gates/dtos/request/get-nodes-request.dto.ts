import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString, Matches } from 'class-validator';

export class GetNodesRequestDto {
  @IsMongoId()
  @IsOptional()
  @Expose({ name: 'user_id' })
  userId?: string;

  @IsString()
  @IsOptional()
  @Matches(/^([a-zA-Z0-9_-]+\/?)+$/)
  path?: string;
}
