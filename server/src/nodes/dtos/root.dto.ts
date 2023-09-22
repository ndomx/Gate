import { IsMongoId, IsString, Matches } from 'class-validator';

export class RootDto {
  @IsString()
  @IsMongoId()
  id: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9-_]+$/)
  name: string;
}
