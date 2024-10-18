import { TrimConfig } from '#/trim-config'
import trimConfig from '@/trim-config'
import { useThemeStoreHook } from '..'

const useConfigStore = defineStore('config', () => {
  const config = ref(trimConfig)

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
