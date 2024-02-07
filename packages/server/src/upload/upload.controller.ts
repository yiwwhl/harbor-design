import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UploadService } from 'src/upload/upload.service';
import { UserService } from 'src/user/user.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    return this.uploadService.handleFileUpload(file, body);
  }

  @UseGuards(AuthGuard)
  @Post('/avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
    @Req() req,
  ) {
    const fileExtension = file.originalname.split('.').at(-1);
    const id = req.user.id;
    const uploadResult = await this.uploadService.handleFileUpload(file, {
      ...body,
      fileName: `${id}.${fileExtension}`,
    });
    await this.userService.updateUserProfile(
      {
        id,
      },
      {
        avatar: uploadResult.fileUrl,
      },
    );
    return uploadResult;
  }
}
