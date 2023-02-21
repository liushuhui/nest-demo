import { TestService } from './test.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  Request,
} from '@nestjs/common';

@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}
  @Post('/add')
  async add(@Body() body): Promise<any> {
    const data = await this.testService.addTest(body);
    return {
      code: 200,
      data
    }
  }
  @Post('/getAll')
  @HttpCode(200)
  async getData(@Body() body): Promise<any> {
    const result = await this.testService.getTest(body);
    return {
      code: 200,
      data: result[0],
      count: result[1],
      pageSize: parseInt(body.pageSize),
      current: parseInt(body.current),
    };
  }
  @Get('/findALl')
  getTestById(@Request() req): any {
    const id = parseInt(req.query.id);
    return this.testService.getTestById(id);
  }

  // 表格导出
  @Post('/tableExport')
  @HttpCode(200)
  exportTable(): any {
    return this.testService.exportTable();
  }

  @Get('/update/:id')
  updateById(@Param() params): any {
    const id: number = params.id;
    return this.testService.updateById(id);
  }
  @Post('/updatePostById')

  updatePostById(@Body() body): any {
    const id: number = body.id;
    return this.testService.updatePostById(id);
  }
  @Delete('/deleteById')
  deleteById(@Body() body): any {
    const id: number = body.id;
    return this.testService.deleteById(id);
  }
}
