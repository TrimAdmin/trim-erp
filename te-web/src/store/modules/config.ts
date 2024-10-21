import { TrimConfig } from '#/trim-config'
import trimConfig from '@/trim-config'
import { useThemeStoreHook } from '..'

const useConfigStore = defineStore('config', () => {
  const config = useLocalStorage('trim__config', trimConfig)

  watchPostEffect(() => {
    document.documentElement.style.setProperty('--trim-header-height', `${config.value.theme.headerHeight}px`)
    document.documentElement.style.setProperty('--trim-sider-width', `${config.value.theme.siderWidth}px`)
  })

  function changeDarkMode() {
    config.value.theme.darkMode = !config.value.theme.darkMode
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
  }
}, {})

export default useConfigStore
