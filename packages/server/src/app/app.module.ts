import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { UploadModule } from 'src/upload/upload.module';

@Module({
  imports: [AuthModule, UserModule, UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
