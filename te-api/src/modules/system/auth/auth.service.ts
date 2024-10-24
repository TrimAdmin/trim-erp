import { Inject, Injectable } from '@nestjs/common'
import { CustomPrismaService } from 'nestjs-prisma'
import { ExtendedPrismaClient } from 'src/modules/common/prisma/prisma.extension'

@Injectable()
export class AuthService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<ExtendedPrismaClient>,
  ) {
  }

  async getUser() {
    return this.prisma.client.sysDictType.findMany()
  }
}
