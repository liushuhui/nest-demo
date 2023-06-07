import {
  Controller,
  Post,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('imgs')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    return this.imageService.upload(file.filename);
  }
}
