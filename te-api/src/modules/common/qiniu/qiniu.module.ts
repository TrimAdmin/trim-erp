import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { QiniuController } from './qiniu.controller'
import { QiniuService } from './qiniu.service'

@Module({
  imports: [ConfigModule],
  controllers: [QiniuController],
  providers: [QiniuService],
  exports: [QiniuService],
})
export class QiniuModule {
}
