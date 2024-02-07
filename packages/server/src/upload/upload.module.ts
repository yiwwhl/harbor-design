import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MinioService } from 'src/minio/minio.service';

@Module({
  providers: [UploadService, MinioService],
  controllers: [UploadController],
})
export class UploadModule {}
