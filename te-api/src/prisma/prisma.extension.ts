import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import { pagination } from 'prisma-extension-pagination'
import { createSoftDeleteExtension } from 'prisma-extension-soft-delete'

export const extendedPrismaClient = new PrismaClient().$extends({
  result: {
    $allModels: {
      createTime: {
        needs: {
          createTime: true,
        } as any,
        compute(data: any) {
          return data.createTime ? dayjs(data.createTime).format('YYYY-MM-DD HH:mm:ss') : null
        },
      },
      updateTime: {
        needs: {
          updateTime: true,
        } as any,
        compute(data: any) {
          return data.updateTime ? dayjs(data.updateTime).format('YYYY-MM-DD HH:mm:ss') : null
        },
      },
      deleteTime: {
        needs: {
          deleteTime: true,
        } as any,
        compute(data: any) {
          return data.deleteTime ? dayjs(data.deleteTime).format('YYYY-MM-DD HH:mm:ss') : null
        },
      },
    },
  },
}).$extends(pagination({
  pages: {
    limit: 10,
    includePageCount: true,
  },
  cursor: {
    limit: 10,
  },
})).$extends(createSoftDeleteExtension({
  models: {
    SysUser: true,
    SysDept: true,
    SysDictData: true,
    SysDictType: true,
    SysRole: true,
    SysUserDept: true,
    SysUserRole: true,
  },
  defaultConfig: {
    field: 'deleteTime',
    createValue: (deleted) => {
      if (deleted)
        return new Date()
      return null
    },
    allowCompoundUniqueIndexWhere: true,
    allowToOneUpdates: true,
  },
}))

export type ExtendedPrismaClient = typeof extendedPrismaClient
