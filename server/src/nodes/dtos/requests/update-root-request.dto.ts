import { OmitType, PartialType } from '@nestjs/swagger';
import { RootDto } from '../root.dto';

class RootWithoutId extends OmitType(RootDto, ['id'] as const) {}

export class UpdateRootRequestDto extends PartialType(RootWithoutId) {}
