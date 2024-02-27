import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { User } from 'src/users/entities/users.entity';

export class LinkCreateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  user: User;

  @IsOptional()
  @IsString()
  shortUrl?: string;
}

export class LinksUpdateDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  url: string;
}
