import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';

@Module({
  controllers: [ImageController],
  imports: [
    TypeOrmModule.forFeature([Image]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../public/imgs'),
        filename: (_, file, callback) => {
          const fileName = `${new Date().getTime()}_${file.originalname}`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  providers: [ImageService]
})
export class ImageModule {}
