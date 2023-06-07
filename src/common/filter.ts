import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
/**
 * 异常拦截
 */
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse();
    response.status(status).json({
      msg: this.wrapperError(error),
      time: new Date().getTime(),
      success: false,
      path: request.url,
      status,
    });
  }
  wrapperError(message) {
    if (typeof message === 'string') {
      return message;
    }
    const errMsg = message.length > 0 && message?.map(im => im.constraints.isNotEmpty).join(',');
    return message.msg ?? errMsg;
  }
}
