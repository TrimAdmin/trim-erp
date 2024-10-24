import { Module } from '@nestjs/common'
import { CustomPrismaModule } from 'nestjs-prisma'
import { extendedPrismaClient } from './modules/common/prisma/prisma.extension'
import { AuthModule } from './modules/system/auth/auth.module'

@Module({
  imports: [CustomPrismaModule.forRootAsync({
    name: 'PrismaService',
    useFactory: () => extendedPrismaClient,
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {
}
