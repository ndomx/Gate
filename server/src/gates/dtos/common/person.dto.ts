import { IsNotEmpty, IsString } from 'class-validator';

export class PersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  last: string;
}
