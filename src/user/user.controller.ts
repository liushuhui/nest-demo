import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Res, Session, Put, UploadedFiles, UploadedFile, UseInterceptors, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('code')
  createCaptcha(@Req() req, @Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4,//生成几个验证码
      fontSize: 50, //文字大小
      width: 100,  //宽度
      height: 34,  //高度
      background: '#cc9966',  //背景颜色
    })
    session.code = captcha.text;//存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log('file', file);
    return this.userService.upload(file.originalname)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
