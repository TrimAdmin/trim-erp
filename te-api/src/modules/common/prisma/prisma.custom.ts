import { Injectable } from '@nestjs/common'
import { CustomPrismaClientFactory } from 'nestjs-prisma'
import { extendedPrismaClient, ExtendedPrismaClient } from './prisma.extension'

@Injectable()
export class PrismaCustomService implements CustomPrismaClientFactory<ExtendedPrismaClient> {
  constructor() {
  }

  createPrismaClient(): ExtendedPrismaClient {
    return extendedPrismaClient
  }
}
