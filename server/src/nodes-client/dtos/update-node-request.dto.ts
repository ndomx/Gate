import { IsOptional } from 'class-validator';
import { UpdateNodeDto } from 'src/nodes/dtos/update-node.dto';

export class UpdateNodeRequestDto extends UpdateNodeDto {
    @IsOptional()
    rootId?: string;

    @IsOptional()
    parent?: string;
}
