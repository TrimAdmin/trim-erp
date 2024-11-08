import { Readable } from 'node:stream'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as qiniu from 'qiniu'
import { v4 as uuidV4 } from 'uuid'
import { UploadCallback } from './types'

@Injectable()
export class QiniuService {
  constructor(private readonly configService: ConfigService) {
  }

  ak = this.configService.get<string>('qiniu.ak')
  sk = this.configService.get<string>('qiniu.sk')
  bucket = this.configService.get<string>('qiniu.bucket')

  // 生成凭证
  generateMac() {
    return new qiniu.auth.digest.Mac(this.ak, this.sk)
  }

  // 生成上传凭证
  generateUploadToken() {
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: this.bucket,
      // 定义返回格式
      // 魔法变量：https://developer.qiniu.com/kodo/1235/vars#magicvar
      returnBody:
        '{"key":"$(key)","hash":"$(etag)","imageInfo":$(imageInfo),"fname":"$(fname)","fsize":$(fsize),"type":"$(mimeType)"}',
      // 如果需要将body返回给其他域名/服务则使用如下参数
      // returnUrl: ''
    })
    return putPolicy.uploadToken(this.generateMac())
  }

  // 上传
  async upload(file: Express.Multer.File): Promise<UploadCallback> {
    const uploader = new qiniu.form_up.FormUploader(
      new qiniu.conf.Config({
        zone: qiniu.zone.Zone_z0,
        useHttpsDomain: true,
      }),
    )
    const putExtra = new qiniu.form_up.PutExtra()
    // buffer转换为可读流
    const stream = Readable.from(file.buffer)

    return new Promise((resolve, reject) => {
      uploader.putStream(
        this.generateUploadToken(),
        `${uuidV4()}.${file.originalname}`,
        stream,
        putExtra,
        (e, respBody, respInfo) => {
          if (e) {
            reject(e)
          }
          if (respInfo.statusCode === 200) {
            resolve(respBody)
          }
          else {
            reject(respBody)
          }
        },
      )
    })
  }

  // 生成预览链接 https://developer.qiniu.com/kodo/sdk/nodejs#private-get
  async preview(key: string) {
    const bucketManager = new qiniu.rs.BucketManager(
      this.generateMac(),
      new qiniu.conf.Config({
        zone: qiniu.zone.Zone_z0,
        useHttpsDomain: true,
      }),
    )
    const domain = this.configService.get<string>('qiniu.domain')
    // 1小时后过期
    const deadline = Math.floor(Date.now() / 1000) + 3600
    return bucketManager.privateDownloadUrl(domain, key, deadline)
  }
}
