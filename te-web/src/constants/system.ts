const { t } = useLocale()

export const themeList = [
  {
    label: t('common.theme.antd'),
    value: 'antd',
  },
  {
    label: t('common.theme.orange'),
    value: 'orange',
  },
  {
    label: t('common.theme.forest'),
    value: 'forest',
  },
] as const

export const localeList = ['zhCN', 'zhTW', 'enUS'] as const

export const layoutList = [
  // 侧边栏布局
  'normal',
  // 顶栏布局
  'top',
  // 混合布局
  'mix',
  // 双栏布局
  'double-columns',
] as const
