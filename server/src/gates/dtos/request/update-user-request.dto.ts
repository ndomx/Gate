import { PartialType } from '@nestjs/swagger';
import { UserDto } from '../common/user.dto';

export class UpdateUserRequestDto extends PartialType(UserDto) {}
