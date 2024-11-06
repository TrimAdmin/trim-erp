import { TrimConfig } from '#/trim-config'

const defaultConfig: TrimConfig = {
  theme: {
    name: 'orange',
    darkMode: false,
    siderWidth: 200,
    headerHeight: 48,
    siderCollapsed: false,
  },
  layout: 'normal',
  locale: 'zhCN',
  feature: {
    showFooter: true,
    showLogo: true,
    showTags: true,
    cacheTabs: true,
  },
}

export default defaultConfig
