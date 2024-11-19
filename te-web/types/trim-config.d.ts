import {
  layoutList,
  localeList,
  themeList,
} from '@/constants/system'

export interface TrimConfig {
  theme: Theme
  layout: typeof layoutList[number]
  locale: typeof localeList[number]
  feature: Feature
}

export type TrimUserConfig = Partial<TrimConfig>

interface Theme {
  name: typeof themeList[number]['value']
  darkMode: boolean
  siderWidth: number
  headerHeight: number
  siderCollapsed: boolean
  siderInverted: boolean
}

interface Feature {
  showFooter: boolean
  showLogo: boolean
  showTags: boolean
  cacheTabs: boolean
  showBreadcrumb: boolean
  dynamicTitle: boolean
  progressBar: boolean
}
