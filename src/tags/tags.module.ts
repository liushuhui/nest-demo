import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Tags } from './entities/tags.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,Tags]),
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
