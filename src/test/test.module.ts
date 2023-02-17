import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Test } from './entities/test.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Test])],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService]
})
export class TestModule {}
