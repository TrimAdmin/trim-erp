import { TrimConfig } from '#/trim-config'
import trimConfig from '@/trim-config'
import { useThemeStoreHook } from '..'

const useConfigStore = defineStore('config', () => {
  const config = ref(trimConfig)

  watchPostEffect(() => {
    document.documentElement.style.setProperty('--trim-header-height', `${config.value.theme.headerHeight}px`)
    document.documentElement.style.setProperty('--trim-sider-width', `${config.value.theme.siderWidth}px`)
  })

  function changeDarkMode() {
    config.value.theme.darkMode = !config.value.theme.darkMode
    useThemeStoreHook().updateThemeOverrides()
  }

  function changeLocale(lang: TrimConfig['locale']) {
    config.value.locale = lang
    useLocale().locale.value = lang as string
  }

  return {
    config,
    changeDarkMode,
    changeLocale,
  }
}, {
  persist: {
    key: 'trim__config',
    storage: localStorage,
  },
})

export default useConfigStore
