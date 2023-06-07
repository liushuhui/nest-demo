import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

interface Data<T> {
  data: T
}
/**
 * 响应拦截
 */
@Injectable()
export class Response<T = any> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Data<T>> {
      return next.handle().pipe(map(data => {
        return {
          data,
          code: 200,
          success: true,
          msg: '成功'
        }
      }))
  }
}
