import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/services/users.service';
import { compare } from 'src/utils/hash.generate';
import { User } from 'src/users/entities/users.entity';
import { PayloadJwt, UserInfo } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateCredentials(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPassword = await compare(pass, user.password);
    if (!isPassword) {
      throw new UnauthorizedException();
    }

    return user;
  }
  async signIn(
    email: string,
    pass: string,
  ): Promise<{
    user: { name: string; email: string; role: string };
    access_token: string;
  }> {
    const user = await this.validateCredentials(email, pass);
    return this.generateJwtToken(user);
  }

  async generateJwtToken(user: User) {
    const payload: UserInfo = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
