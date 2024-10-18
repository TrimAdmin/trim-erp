import trimConfig from '@/trim-config'
import { useThemeStoreHook } from '..'

const useConfigStore = defineStore('config', () => {
  const config = ref(trimConfig)

  function changeDarkMode() {
    config.value.theme.darkMode = !config.value.theme.darkMode
    useThemeStoreHook().updateThemeOverrides()
  }

  return {
    config,
    changeDarkMode,
  }
}, {
  persist: {
    key: 'trim__config',
    storage: localStorage,
  },
})

export default useConfigStore
