import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder().setTitle('Trim ERP').setDescription('api docs for Trim ERP').setVersion('1.0').build()
  const document = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-doc', app, document, {
    jsonDocumentUrl: 'api-doc/json',
  })
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // 启用全局校验拦截
  app.useGlobalPipes(new ValidationPipe())
  // 初始化swagger
  initSwagger(app)
  await app.listen(5000)
}

bootstrap()
