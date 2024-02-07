import { Injectable } from '@nestjs/common';
import { MinioService } from 'src/minio/minio.service';

interface FileUploadOptions {
  filePath: string;
  fileName: string;
}

@Injectable()
export class UploadService {
  constructor(private readonly minioService: MinioService) {}

  handleFileUpload(file: Express.Multer.File, options: FileUploadOptions) {
    const fileName = options.fileName ?? file.originalname;
    const filePath = options.filePath
      ? `${options.filePath}/${fileName}`
      : fileName;
    const { MINIO_PROTOCOL, MINIO_ENDPOINT, MINIO_PORT } = process.env;
    const fileUrl = `${MINIO_PROTOCOL}//${MINIO_ENDPOINT}:${MINIO_PORT}/harbor-design/${filePath}`;

    return this.minioService
      .uploadFile('harbor-design', filePath, file.buffer, file.size)
      .then(() => {
        return { message: '文件上传成功', fileName, fileUrl };
      })
      .catch((e) => {
        throw new Error(`文件上传失败：${e}`);
      });
  }
}
