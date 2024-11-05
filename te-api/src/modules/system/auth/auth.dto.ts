import { IsNotEmpty } from 'class-validator'

export class LoginDto {
  @IsNotEmpty({
    message: '用户名必填',
  })
  username: string

  @IsNotEmpty({
    message: '密码必填',
  })
  password: string
}
