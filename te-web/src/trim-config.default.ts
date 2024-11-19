import { TrimConfig } from '#/trim-config'

const defaultConfig: TrimConfig = {
  theme: {
    name: 'orange',
    darkMode: false,
    siderWidth: 240,
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
    showBreadcrumb: true,
  },
}

export default defaultConfig
