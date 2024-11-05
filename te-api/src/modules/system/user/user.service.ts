import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/prisma/prisma.extension'
import { formatPagination, paginate } from 'src/utils/pagination'
import {
  UserCreateDto,
  UserQueryDto,
  UserUpdateDto,
} from './user.dto'

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
        nickname: true,
        email: true,
        phone: true,
        status: true,
        sex: true,
        createTime: true,
        updateTime: true,
      },
    })
    if (!user.id)
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST)
    return Promise.resolve(user)
  }

  // 根据用户名搜索用户
  async findOneByUsername(username: string) {
    return await this.prisma.client.sysUser.findFirst({
      where: {
        username: {
          equals: username,
        },
      },
    })
  }

  // 分页
  async page(query: UserQueryDto) {
    const {
      limit,
      page,
      username,
    } = query
    const data = await this.prisma.client.sysUser.paginate({
      where: {
        username: {
          contains: username,
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        nickname: true,
        phone: true,
        status: true,
        sex: true,
        createTime: true,
        updateTime: true,
      },
      orderBy: {
        createTime: 'desc',
      },
    }).withPages(paginate(limit, page))
    return formatPagination(data, limit)
  }

  // 新增
  async create(data: UserCreateDto) {
    const defaultPassword = await bcrypt.hash('123456', 10)
    await this.prisma.client.sysUser.create({
      data: {
        ...data,
        password: data.password || defaultPassword,
      },
    })
  }

  // 编辑
  async update(data: UserUpdateDto) {
    await this.prisma.client.sysUser.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        id: undefined,
      },
    })
  }

  // 删除
  async delete(idList: number[]) {
    await this.prisma.client.sysUser.deleteMany({
      where: {
        id: {
          in: idList,
        },
      },
    })
  }
}
