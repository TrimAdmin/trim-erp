import { Module } from '@nestjs/common'
import { CustomPrismaModule } from 'nestjs-prisma'
import { AuthModule } from './modules/system/auth/auth.module'
import { extendedPrismaClient } from './prisma/prisma.extension'

@Module({
  imports: [CustomPrismaModule.forRootAsync({
    name: 'PrismaService',
    useFactory: () => {
      return extendedPrismaClient
    },
    isGlobal: true,
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
