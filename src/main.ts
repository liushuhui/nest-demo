import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //swagger
  const swgger = new DocumentBuilder()
    .setTitle('测试接口文档')
    .setDescription('详细描述')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, swgger);
  SwaggerModule.setup('/api-docs', app, document);
  
  app.useGlobalInterceptors(new Response());
  app.useGlobalFilters(new HttpFilter());
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
  app.useStaticAssets(join(__dirname, 'public/imgs'), { prefix: '/images/' });
  await app.listen(3000);
}
bootstrap();
