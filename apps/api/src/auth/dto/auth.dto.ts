import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
