import * as process from 'node:process'
import { ConfigFactory } from '@nestjs/config'

interface ConfigType {
  server: {
    port: string
  }
  jwt: {
    secret: string
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
  }
}

export default config
