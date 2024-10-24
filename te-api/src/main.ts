import process from 'node:process'
import {
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './exception/http'
import { UnauthorizedExceptionFilter } from './exception/unauthorized'

function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder().setTitle('Trim ERP').setDescription('api docs for Trim ERP').setVersion('1.0').build()
  const document = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-doc', app, document, {
    jsonDocumentUrl: 'api-doc/json',
  })
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 非生产环境初始化swagger
  if (process.env.NODE_ENV !== 'production') {
    initSwagger(app)
  }
  // 跨域
  app.enableCors({
    origin: true,
    credentials: true,
    maxAge: 1728000,
  })
  // 启用全局校验拦截
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
  }))
  // 启用全局过滤
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter, {
    P2000: HttpStatus.BAD_REQUEST,
    P2002: HttpStatus.CONFLICT,
    P2025: HttpStatus.NOT_FOUND,
  }), new HttpExceptionFilter(), new UnauthorizedExceptionFilter())
  const config = app.get(ConfigService)
  const port = config.get('server.port')
  await app.listen(port)
}

bootstrap()
