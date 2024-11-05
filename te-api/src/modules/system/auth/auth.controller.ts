import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { Public } from '../../../decorator/public'
import { response } from '../../../utils/response'
import { LoginDto } from './auth.dto'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('系统-认证相关')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('login')
  @Public()
  @ApiOperation({
    summary: '登录',
  })
  async login(@Body() loginData: LoginDto) {
    const token = await this.authService.login(loginData)
    return response.ok(token)
  }

  @Get('user-info')
  @ApiOperation({
    summary: '获取用户信息',
  })
  async getUserInfo(@Headers() headers: { token: string }) {
    const userInfo = await this.authService.getUserInfo(headers?.token)
    return response.ok(userInfo)
  }
}
