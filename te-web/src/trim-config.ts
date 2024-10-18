import { TrimUserConfig } from '#/trim-config'
import { toMerged } from 'es-toolkit'
import defaultConfig from './trim-config.default'

// 在这里覆盖你的配置
const config: TrimUserConfig = {}

export default toMerged(defaultConfig, config)
