import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { flatten, uniq } from 'es-toolkit'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/prisma/prisma.extension'
import { UserService } from '../user/user.service'
import { LoginDto } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
    private userService: UserService,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
  }

  // 登录
  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByUsername(loginDto.username)
    if (!user) {
      throw new HttpException('用户名错误或不存在', HttpStatus.BAD_REQUEST)
    }
    const isSame = await compare(loginDto.password, user.password)
    // const isSame = loginDto.password === user.password
    if (!isSame) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST)
    }
    try {
      const payload = {
        sub: user.id,
        username: user.username,
      }
      const secret = this.configService.get<string>('jwt.secret')
      // expiresIn时间规则详见 https://github.com/vercel/ms#readme
      const token = await this.jwtService.signAsync(payload, {
        secret,
        expiresIn: '3d',
      })
      return Promise.resolve(token)
    }
    catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // 获取当前用户信息
  async getUserInfo(token: string) {
    try {
      const secret = this.configService.get<string>('jwt.secret')
      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      })
      const user = await this.userService.findOneById(payload.sub)
      const permissions = await this.getUserPermission(user.id)
      return Promise.resolve({
        ...user,
        permissions,
      })
    }
    catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getUserPermission(id: number) {
    const userRoles = await this.prisma.client.sysUserRole.findMany({
      where: {
        userId: id,
      },
      select: {
        role: true,
      },
    })
    return uniq(flatten(userRoles.map((item) => item.role.permission)))
  }
}
