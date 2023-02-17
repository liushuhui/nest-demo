import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private testRepository: Repository<Test>,
  ) {}
  async getTest(queryParams) {
    const { pageSize, current } = queryParams;
    const sql = this.testRepository.createQueryBuilder('test');
    const data = await sql
      .skip(current - 1)
      .take(pageSize)
      .getManyAndCount();
    return data;
  }
  addTest(body) {
    return this.testRepository.save(body);
  }
  getTestById(id: any) {
    return this.testRepository.findOne({ where: { id } });
  }
  updateById(id: number) {
    const data = new Test();
    data.age = 19;
    data.name = 'sss';
    return this.testRepository.update(id, data);
  }
  updatePostById(id: number) {
    const data = new Test();
    data.age = 19;
    data.name = '小花';
    return this.testRepository.update(id, data);
  }
  deleteById(id: number) {
    return this.testRepository.delete(id);
  }
}
