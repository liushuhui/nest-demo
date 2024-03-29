import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    UserModule,
    TagsModule,
    ImageModule,
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库的连接地址host
      port: 3306, // 数据库的端口 3306
      username: 'root', // 连接账号
      password: '123456', // 连接密码
      database: 'test_db', // 连接的表名
      retryDelay: 500, // 重试连接数据库间隔
      retryAttempts: 10, // 允许重连次数
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true, // 自动查找Entity实体
    }),
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
