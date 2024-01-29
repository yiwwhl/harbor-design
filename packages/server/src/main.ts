import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from 'src/config';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: config.ORIGIN, // 允许的来源，可以是一个字符串或字符串数组
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的方法
    allowedHeaders: '*', // 允许的头部
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
