import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username, pass) {
    const user = await this.userService.findUser({
      username,
    });
    if (user?.password !== pass) {
      return {
        code: 1,
        message: '用户名或密码错误',
      };
    }
    const payload = { username: user.username };
    return {
      code: 0,
      data: {
        token: await this.jwtService.signAsync(payload),
      },
      message: '0',
    };
  }
}
