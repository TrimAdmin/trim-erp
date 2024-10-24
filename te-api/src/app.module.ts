import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CustomPrismaModule } from 'nestjs-prisma'
import config from './config'
import { SystemModule } from './modules/system/system.module'
import { extendedPrismaClient } from './prisma/prisma.extension'

@Module({
  imports: [
    // config
    ConfigModule.forRoot({
      load: [config],
      envFilePath: ['.env', '.env.dev', '.env.prod'],
    }),
    // 全局注册自定义prisma
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      useFactory: () => {
        return extendedPrismaClient
      },
      isGlobal: true,
    }),
    // 系统管理
    SystemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
