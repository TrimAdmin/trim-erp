import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.sysRole.create({
    data: {
      id: 1,
      name: '管理员',
      permission: ['*'],
    },
  })
  await prisma.sysUser.create({
    data: {
      id: 1,
      username: 'admin',
      password: '123456',
    },
  })
  await prisma.sysUserRole.create({
    data: {
      userId: 1,
      roleId: 1,
    },
  })
}

main().catch((e) => console.error(e)).finally(async () => {
  await prisma.$disconnect()
})
