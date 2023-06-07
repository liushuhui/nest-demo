import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { User } from './entities/user.entity';
import { Tags } from 'src/tags/entities/tags.entity';
import { Image } from 'src/image/entities/image.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Tags, User, Image]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../public/files'),
        filename: (_, file, callback) => {
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
