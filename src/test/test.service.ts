import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Like, Repository } from 'typeorm';
import * as moment from 'moment';
import * as ExcelJS from 'exceljs';
import { createReadStream, unlinkSync, readdirSync } from 'fs';
import { join } from 'path';

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
        Object.keys(sorter ?? {})?.[0] ?? 'date',
        Object.values?.(sorter ?? {})?.[0]
          ? Object.values?.(sorter ?? {})?.[0] === 'descend'
            ? 'DESC'
            : 'ASC'
          : 'DESC',
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
    body.date = moment().format('YYYY-MM-DD hh:mm:ss');
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
  updatePostById(id, body) {
    body.date = moment().format('YYYY-MM-DD hh:mm:ss');
    return this.testRepository.update(id, body);
  }
  async deleteById(id: number) {
    const data = await this.getTestById(id);
    const path = data.imgs.replace('http://localhost:3000/images/', '');
    //获取文件
    const imgsList = readdirSync(join(__dirname, '../public/imgs'));
    if (imgsList.includes(path)) {
      unlinkSync(join(__dirname, `../public/imgs/${path}`));
    }
    return this.testRepository.delete(id);
  }

  //导出
  async exportTable(): Promise<NodeJS.ReadableStream> {
    const result = await this.testRepository.find();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('excel表格');
    worksheet.columns = [
      {
        header: 'id',
        key: 'id',
        alignment: { horizontal: 'center' },
      },
      {
        header: 'name',
        key: 'name',
        alignment: { horizontal: 'center' },
      },
      {
        header: 'age',
        key: 'age',
        alignment: { horizontal: 'center' },
      },
      {
        header: 'skill',
        key: 'skill',
        width: 50,
        alignment: { horizontal: 'center' },
      },
    ];
    worksheet.addRows(result);
    // 将Excel文件写入文件流中
    const filePath = join(__dirname, '../public/files/file.xlsx');
    await workbook.xlsx.writeFile(filePath);
    const readStream = createReadStream(filePath);
    return readStream;
  }

  // 导入
  async importTable(buffer: Buffer) {
    const workbook = new ExcelJS.Workbook();
    const sheet = await workbook.xlsx
      .load(buffer)
      .then((wb) => wb.getWorksheet(1));
    const result = [];
    sheet.eachRow({ includeEmpty: false }, (row) => {
      if (row.number === 1) {
        return;
      }
      const rowData = row.values;
      result.push(rowData);
      const temps = result.map((im) => {
        return {
          // id: im[1],
          name: im[2],
          age: im[3],
          skill: im[4],
        };
      });
      this.testRepository.save(temps);
    });
    return result;
  }
}
