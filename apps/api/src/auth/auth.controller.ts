import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignInDTO } from './dto/auth.dto';
import { AuthGuard } from './guards/auth.guard';
import { UsersService } from 'src/users/services/users.service';
import { PayloadJwt } from 'src/interfaces/jwt-payload.interface';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() body: SignInDTO) {
    return this.authService.signIn(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  async getProfile(@Request() req: PayloadJwt) {
    const { email } = req;
    const user = await this.userService.findUserByEmail(email);
    return this.authService.generateJwtToken(user);
  }
}
