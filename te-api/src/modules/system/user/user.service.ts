import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/prisma/prisma.extension'

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {
  }

  async findOneById(id: number) {
    const user = await this.prisma.client.sysUser.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        nickname: true,
        status: true,
        createTime: true,
        updateTime: true,
      },
    })
    if (!user.id)
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST)
    return Promise.resolve(user)
  }

  async findOneByUsername(username: string) {
    return await this.prisma.client.sysUser.findFirst({
      where: {
        username,
      },
    })
  }
}
