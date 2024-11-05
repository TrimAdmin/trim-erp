import {
  layoutList,
  localeList,
  themeList,
} from '@/constants/system'

export interface TrimConfig {
  theme: Theme
  locale: typeof localeList[number]
}

export type TrimUserConfig = Partial<TrimConfig>

interface Theme {
  name: typeof themeList[number]['value']
  darkMode: boolean
  layout: typeof layoutList[number]
  siderWidth: number
  headerHeight: number
  siderCollapsed: boolean
  contentScrollMode: 'page' | 'content'
}
