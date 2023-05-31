import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(); // 允许跨域
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: 'user',
      name: 'user.sid',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 },
    }),
  );
  app.useStaticAssets(join(__dirname, 'public/imgs'), {prefix: '/images/'})
  await app.listen(3000);
}
bootstrap();
