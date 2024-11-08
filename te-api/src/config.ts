import * as process from 'node:process'
import { ConfigFactory } from '@nestjs/config'

interface ConfigType {
  server: {
    port: string
  }
  jwt: {
    secret: string
  }
  qiniu: {
    ak: string
    sk: string
    domain: string
    bucket: string
  }
}

const config: ConfigFactory<ConfigType> = () => {
  console.log('Current is under:', process.env.NODE_ENV)

  return {
    server: {
      port: process.env.APP_PORT || '3000',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'secret',
    },
    qiniu: {
      ak: process.env.FILES_ACCESS_KEY || '',
      sk: process.env.FILES_SECRET_KEY || '',
      domain: process.env.FILES_DOMAIN || '',
      bucket: process.env.FILES_BUCKET || '',
    },
  }
}

export default config
