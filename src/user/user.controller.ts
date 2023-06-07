import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  Request,
  Res,
  UseInterceptors,
  UploadedFile,
  Put,
  Req,
  Session,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { UserPipe } from './user.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('test')
@ApiTags('test接口')
export class UserController {
  constructor(private testService: UserService) {}
  @Post('/add')
  @ApiParam({name: 'name', description: '姓名', required: true})
  async add(@Req() req, @Session() session, @Body(UserPipe) body: CreateUserDto): Promise<any> {
    // if (!session?.code || session?.code?.toLocaleLowerCase() !== body?.code?.toLocaleLowerCase()) {
    //   throw new HttpException({ msg: '验证码错误' }, HttpStatus.BAD_REQUEST);
    // }
    const data = await this.testService.addTest(body);
    return {
      code: 200,
      data,
    };
  }
  @Post('/getAll')
  @ApiOperation({summary: '获取列表', description:'需要登录'})
  @HttpCode(200)
  async getData(@Body() body): Promise<any> {
    const result = await this.testService.getTest(body);
    return {
      list: result[0],
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
  @UseInterceptors(FileInterceptor('file'))
  async exportTable(@Res() res: Response, @UploadedFile() file) {
    const stream = await this.testService.exportTable();
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    res.setHeader(
      `Content-Disposition`,
      `attachment; filename=${Date.now()}.xlsx`,
    );
    res.setHeader('Content-Type', 'application/vnd.ms-excel;charset=utf-8');
    stream.pipe(res);
  }
  //导入
  @Post('/tableImport')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async importTable(@UploadedFile() file) {
    const result = await this.testService.importTable(file.buffer);
    return { data: result };
  }

  @Get('/update/:id')
  updateById(@Param() params): any {
    const id: number = params.id;
    return this.testService.updateById(id);
  }
  @Put('/updateById/:id')
  updatePostById(@Param('id') id: number, @Body() body): any {
    return this.testService.updatePostById(id, body);
  }
  @Delete('/deleteById/:id')
  async deleteById(@Param('id') id: number): Promise<any> {
    const result = await this.testService.deleteById(id);
    return result
      ? {
          code: 200,
          msg: '成功',
        }
      : {
          code: 500,
          msg: '失败',
        };
  }
}
