import { TestService } from './test.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
  @Get('/getAll')
  async getData(@Query() queryParams): Promise<any> {
    console.log('params',queryParams);
    const result = await this.testService.getTest(queryParams);
    return {
      code: 200,
      data: result[0],
      count: result[1],
    };
  }
  @Get('/findALl')
  getTestById(@Request() req): any {
    const id = parseInt(req.query.id);
    return this.testService.getTestById(id);
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
