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
  // 普通布局
  'normal',
  // 顶栏布局
  'top',
] as const
