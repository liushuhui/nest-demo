import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forFeature([Test]),
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
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
