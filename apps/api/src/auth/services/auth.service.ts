import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { compare } from 'src/utils/hash.generate';
import { ErrorManager } from 'src/config/error.manager';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ user: { name: string; email: string }; access_token: string }> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new ErrorManager({
        type: 'UNAUTHORIZED',
        message: 'Credenciales incorrectas',
      });
    }
    const isPassword = await compare(pass, user.password);
    if (!isPassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      user: {
        name: user.name,
        email: user.email,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
