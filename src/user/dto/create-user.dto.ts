import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  code: string;

  imgs: string;

  @ApiProperty({ description: "技能", example: "唱歌" })
  @IsNotEmpty({message: '技能不能为空'})
  skill: string;

  @IsNotEmpty({message: '姓名不能为空'}) // 验证是否为空
  @IsString() //是否为字符串
  name: string;

  @IsNotEmpty({message: '年龄不能为空'})
  age: number;
}
