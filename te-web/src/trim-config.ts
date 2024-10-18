import { TrimUserConfig } from '#/trim-config'
import { toMerged } from 'es-toolkit'
import defaultConfig from './trim-config.default'

const config: TrimUserConfig = {}

export default toMerged(defaultConfig, config)
