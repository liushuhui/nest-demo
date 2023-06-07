import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  upload(fileUrl) {
    return `http://localhost:3000/images/${fileUrl}`;
  }
}
