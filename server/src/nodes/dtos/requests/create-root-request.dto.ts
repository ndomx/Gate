import { OmitType } from '@nestjs/swagger';
import { RootDto } from '../root.dto';

export class CreateRootRequestDto extends OmitType(RootDto, ['id'] as const) {}
