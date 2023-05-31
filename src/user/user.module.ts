import { diskStorage } from 'multer';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '../test/entities/test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Test]),
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../public/imgs'),
        filename: (_, file, callback) => {
          console.log('___', _);
          const fileName = `${file.originalname}`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
