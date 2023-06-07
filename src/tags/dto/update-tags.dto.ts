import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-tags.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
