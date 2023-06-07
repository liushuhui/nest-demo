import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class UserPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value);
    const err = await validate(DTO);
    console.log(err);
    console.log('value', value);
    if (err.length > 0) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
    return value;
  }
}
