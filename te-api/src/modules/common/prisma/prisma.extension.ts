import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'

export const extendedPrismaClient = new PrismaClient().$extends({
  result: {
    $allModels: {
      createTime: {
        needs: {
          createTime: true,
        } as any,
        compute(data: any) {
          return dayjs(data.createTime).format('YYYY-MM-DD HH:mm:ss')
        },
      },
    },
  },
})

export type ExtendedPrismaClient = typeof extendedPrismaClient
