import { HttpStatus } from '@nestjs/common'

class CommonResponse {
  response(code: number, message: string, success: boolean, data?: any) {
    return {
      code,
      message,
      success,
      data: data || null,
    }
  }

  ok<T>(data?: T) {
    return this.response(HttpStatus.OK, '请求成功', true, data)
  }

  fail(message?: string) {
    return this.response(HttpStatus.BAD_REQUEST, message || '请求失败', false)
  }

  error(message?: string) {
    return this.response(HttpStatus.INTERNAL_SERVER_ERROR, message || '服务器出错', false)
  }

  unauthorized() {
    return this.response(HttpStatus.UNAUTHORIZED, '请先登录', false)
  }
}

export const response = new CommonResponse()
