import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  Res,
  Session,
  Put,
  UploadedFiles,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateUserDto } from './dto/create-tags.dto';
import { UpdateUserDto } from './dto/update-tags.dto';
import * as svgCaptcha from 'svg-captcha';
import { FileInterceptor } from '@nestjs/platform-express';
import { RoleGuard } from '../guard/role.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
// @UseGuards(RoleGuard) //守卫
@ApiTags('用户')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.tagsService.create(createUserDto);
  }

  @Get('code')
  createCaptcha(@Req() req, @Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    session.code = captcha.text; //存储验证码记录到session
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  @Post('editTags')
  addTag(@Body() params: {tags: string[], userId: number}) {
    return this.tagsService.addTag(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }
  @Get()
  @SetMetadata('role', ['admin'])
  findAll() {
    return this.tagsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.tagsService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagsService.remove(+id);
  }
}
