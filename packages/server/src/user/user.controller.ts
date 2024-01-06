import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/username/:id')
  findUserByUsername(@Param() { id }) {
    return this.userService.findUser(id);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return {
      code: 0,
      data: {
        ...(await this.userService.findUserByUsername(req.user.username)),
      },
      message: '0',
    };
  }
}
