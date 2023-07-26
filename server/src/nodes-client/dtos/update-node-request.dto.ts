import { IsOptional } from 'class-validator';
import { UpdateNodeRequestDto } from 'src/nodes/dtos/requests/update-node-request.dto';

export class UpdateNodeRequestDto extends UpdateNodeRequestDto {
    @IsOptional()
    rootId?: string;

    @IsOptional()
    parent?: string;
}
