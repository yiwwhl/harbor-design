import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MinioService } from 'src/minio/minio.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [UploadService, MinioService],
  controllers: [UploadController],
})
export class UploadModule {}
