import { HttpCode, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-tags.dto';
import { UpdateUserDto } from './dto/update-tags.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tags } from './entities/tags.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    @InjectRepository(Tags) private tags: Repository<Tags>,
  ) {}

  //通过前端传入的userId 查到当前id 的用户信息，然后拿到前端传入的tags [tag1,tag2,tag3]
  // 进行遍历 给tag实例进行赋值 然后调用保存方法添加tag 添加完之后 通过 tagList 保存该tag类
  // 最后把tagList 赋给 user类的tags属性 然后重新调用save 进行更新
  @HttpCode(200)
  async addTag(params:{tags: string[], userId: number}) {
    const userInfo = await this.user.findOne({where: {id: params.userId}});
    const tagList:Tags[] = [];
    params?.tags.forEach(async (item) => {
      let T = new Tags();
      T.tag = item;
      T.userId = params.userId;
      await this.tags.save(T);
      tagList.push(T);
    })
    userInfo.tags = tagList;
    return this.user.save(userInfo);
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.tags.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
