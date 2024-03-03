import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';
import { User } from 'src/users/entities/users.entity';

export class LinkCreateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsUrl(
    { protocols: ['http', 'https'], require_protocol: true },
    { message: 'Url no válido' },
  )
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

export class UserLinkDeleteDto {
  @IsNotEmpty()
  @IsUUID()
  user: User;
}
