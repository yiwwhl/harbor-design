import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      code: 0,
      data: 'ok',
    };
  }
}
