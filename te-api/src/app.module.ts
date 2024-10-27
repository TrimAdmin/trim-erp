import {
  HttpStatus,
  Logger,
  Module,
} from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core'
import {
  CustomPrismaModule,
  loggingMiddleware,
  PrismaClientExceptionFilter,
  PrismaModule,
  QueryInfo,
} from 'nestjs-prisma'
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
    // prisma logger
    PrismaModule.forRoot({
      prismaServiceOptions: {
        middlewares: [loggingMiddleware({
          logger: new Logger('PrismaMiddleware'),
          logLevel: 'debug',
          logMessage: (query: QueryInfo) => `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
        })],
      },
    }),
    // 系统管理
    SystemModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => new PrismaClientExceptionFilter(httpAdapter, {
        P2000: HttpStatus.BAD_REQUEST,
        P2002: HttpStatus.CONFLICT,
        P2025: HttpStatus.NOT_FOUND,
      }),
      inject: [HttpAdapterHost],
    },
  ],
})
export class AppModule {
}
