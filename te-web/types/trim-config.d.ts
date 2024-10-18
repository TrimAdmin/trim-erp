import { themeList } from '@/constants/system'

export interface TrimConfig {
  theme: Theme
}

export type TrimUserConfig = Partial<TrimConfig>

interface Theme {
  name: typeof themeList[number]
  darkMode: boolean
}
