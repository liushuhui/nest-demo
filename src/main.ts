import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import path, { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 允许跨域
  app.use(session({secret: 'user', name: 'user.sid', rolling: true,cookie: {maxAge: 99999}}));
  await app.listen(3000);
}
bootstrap();