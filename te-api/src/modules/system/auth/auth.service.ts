import { Inject, Injectable } from '@nestjs/common'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/prisma/prisma.extension'
import { formatPagination } from 'src/utils/pagination'

@Injectable()
export class AuthService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {
  }

  async getUser() {
    return formatPagination(await this.prisma.client.sysDictType.paginate({}).withPages({
      limit: 10,
      page: 1,
    }))
  }
}
