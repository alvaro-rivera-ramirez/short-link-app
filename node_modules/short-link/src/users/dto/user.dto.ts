import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from 'src/constants/roles';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}

export class UserUpdateDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}
