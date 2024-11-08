import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { response } from 'src/utils/response'
import { QiniuService } from './qiniu.service'
import { UploadCallback } from './types'

@Controller('file')
@ApiTags('通用-文件相关')
export class QiniuController {
  constructor(private readonly qiniuService: QiniuService) {
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '上传文件',
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const res: UploadCallback = await this.qiniuService.upload(file)
      const url = await this.qiniuService.preview(res.key)
      return response.ok({
        ...res,
        url,
      })
    }
    catch (e) {
      console.log(e)
      return response.fail('上传失败')
    }
  }

  @Get('preview')
  @ApiOperation({
    summary: '获取文件预览url',
  })
  async getPreviewUrl(@Query('key') key: string) {
    try {
      const url = await this.qiniuService.preview(key)
      return response.ok(url)
    }
    catch (e) {
      console.log(e)
      return response.fail()
    }
  }
}
