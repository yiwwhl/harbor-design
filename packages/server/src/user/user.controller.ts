import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/username/:id')
  findUserByUsername(@Param() { id }) {
    return this.userService.findUser(id);
  }

  @Post('/login')
  async login(@Body() { username, password }) {
    const user = await this.userService.findUser({
      AND: {
        username,
        password,
      },
    });
    if (user) {
      return {
        code: 0,
        data: {
          token: 'dev-token' + Date.now(),
        },
        message: '0',
      };
    } else {
      return {
        code: 1,
        message: '用户名或密码错误',
      };
    }

    return;
  }
}
