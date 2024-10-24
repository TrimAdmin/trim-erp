import type { Response } from 'express'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { response } from '../utils/response'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>()
    const status = exception.getStatus()
    const exceptionRes = exception.getResponse() as any
    // 获取异常信息
    const msg
      = typeof exceptionRes === 'string'
        ? exceptionRes
        : exceptionRes && Array.isArray(exceptionRes.message) // 对校验单独处理
          ? exceptionRes.message[0]
          : exceptionRes.message

    if (msg) {
      res.status(status).json(response.response(status, msg, false))
    }
    else {
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          res.status(status).json(response.fail())
          break
        case HttpStatus.INTERNAL_SERVER_ERROR:
          res.status(status).json(response.error())
          break
        default:
          res.status(status).json(response.fail())
          break
      }
    }
  }
}
