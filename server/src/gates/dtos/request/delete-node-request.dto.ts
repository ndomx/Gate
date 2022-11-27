import { Expose } from 'class-transformer';
import { IsDefined, IsMongoId } from 'class-validator';

export class DeleteNodeRequestDto {
  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'admin_id' })
  adminId: string;

  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'root_id' })
  rootId: string;

  @IsMongoId()
  @IsDefined()
  @Expose({ name: 'node_id' })
  nodeId: string;
}
