import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class NodeOptionsDto {
  @IsBoolean()
  @IsOptional()
  @Expose({ name: 'create_intermidiate' })
  createIntermidiate?: boolean;
}
