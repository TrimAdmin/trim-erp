import { TrimConfig } from '#/trim-config'
import { themeList } from '@/constants/system'
import trimConfig from '@/trim-config'
import { useThemeStoreHook } from '..'

const useConfigStore = defineStore('config', () => {
  const config = useLocalStorage('trim__config', trimConfig)

  watchPostEffect(() => {
    document.documentElement.style.setProperty('--trim-header-height', `${config.value.theme.headerHeight}px`)
    document.documentElement.style.setProperty('--trim-header-height-with-tags', `${config.value.theme.headerHeight + (config.value.feature.showTags ? 40 : 0)}px`)
    document.documentElement.style.setProperty('--trim-sider-width', `${config.value.theme.siderCollapsed ? 64 : config.value.theme.siderWidth}px`)
    document.documentElement.style.setProperty('--trim-footer-height', `${config.value.feature.showFooter ? 48 : 0}px`)
    // 侧边栏反转跟随布局和暗色模式
    if (config.value.layout === 'top') {
      config.value.theme.siderInverted = false
    }
    else {
      config.value.theme.siderInverted = config.value.theme.darkMode
    }
  })

  function changeDarkMode() {
    config.value.theme.darkMode = !config.value.theme.darkMode
    useThemeStoreHook().updateThemeOverrides()
  }

  function changeTheme(theme: typeof themeList[number]['value']) {
    config.value.theme.name = theme
    useThemeStoreHook().updateThemeOverrides()
  }

  function changeSiderCollapsed() {
    config.value.theme.siderCollapsed = !config.value.theme.siderCollapsed
  }

  function changeLocale(lang: TrimConfig['locale']) {
    config.value.locale = lang
    useLocale().locale.value = lang as string
  }

  changeLocale(config.value.locale)

  return {
    config,
    changeDarkMode,
    changeLocale,
    changeSiderCollapsed,
    changeTheme,
  }
}, {})

export default useConfigStore
