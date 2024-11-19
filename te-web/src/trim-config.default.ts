import { TrimConfig } from '#/trim-config'

const defaultConfig: TrimConfig = {
  theme: {
    name: 'orange',
    darkMode: false,
    siderWidth: 200,
    headerHeight: 48,
    siderCollapsed: false,
    menuInverted: false,
  },
  layout: 'double-columns',
  locale: 'zhCN',
  feature: {
    showFooter: true,
    showLogo: true,
    showTags: true,
    cacheTabs: true,
    showBreadcrumb: true,
    dynamicTitle: true,
    progressBar: true,
  },
}

export default defaultConfig
