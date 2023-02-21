import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Like, Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test) private testRepository: Repository<Test>,
  ) {}
  async getTest(queryParams) {
    const { pageSize, current, name, age, skill, sorter } = queryParams;
    const sql = this.testRepository
      .createQueryBuilder('test')
      .orderBy(
        Object.keys(sorter ?? {})?.[0],
        Object.values?.(sorter ?? {})?.[0] === 'descend' ? 'DESC' : 'ASC',
      );
    name && sql?.andWhere('test.name like :name', { name: `%${name}%` });
    age && sql?.andWhere('test.age like :age', { age: `%${age}%` });
    skill && sql?.andWhere('test.skill like :skill', { skill: `%${skill}%` });
    return sql
      .skip(pageSize * (current - 1))
      .take(pageSize)
      .getManyAndCount();
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

  //导出
  async exportTable() {
    const result = await this.testRepository.find();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('excel表格');
    worksheet.columns = [
      {
        header: 'id', 
        key: 'id'
      },
      {
        header: 'name', 
        key: 'name'
      },
      {
        header: 'age', 
        key: 'age'
      },
      {
        header: 'skill', 
        key: 'skill'
      },
    ]
    worksheet.addRows(result);
    return workbook.xlsx.writeBuffer();
  }
}
