import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findUser(schema) {
    return this.prisma.user.findFirst({
      where: schema,
    });
  }

  findUserByUsername(username) {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        nickname: true,
        gender: true,
        email: true,
        avatar: true,
      },
    });
  }

  updateUserProfile(where, data) {
    return this.prisma.user.update({
      where,
      data,
    });
  }
}
