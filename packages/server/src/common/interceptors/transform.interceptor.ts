import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../responses/api.response';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        const responseMessage =
          data && data.message ? data.message : 'Request successful';
        const responseData =
          data && data.message ? { ...data, message: undefined } : data;

        return new ApiResponse<T>('success', responseMessage, responseData);
      }),
    );
  }
}
