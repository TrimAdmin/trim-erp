import { getThemeOverrides } from '@/theme'
import { GlobalThemeOverrides } from 'naive-ui'
import { useConfigStoreHook } from '..'

const useThemeStore = defineStore('theme', () => {
  const themeOverrides = ref<GlobalThemeOverrides>()

  function updateThemeOverrides() {
    getThemeOverrides(useConfigStoreHook().config.theme).then((theme) => {
      themeOverrides.value = theme
    })
  }

  updateThemeOverrides()

  return {
    themeOverrides,
    updateThemeOverrides,
  }
})

export default useThemeStore
