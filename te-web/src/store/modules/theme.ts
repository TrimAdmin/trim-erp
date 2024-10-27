import { getThemeOverrides } from '@/theme'
import { kebabCase, toMerged } from 'es-toolkit'
import {
  darkTheme,
  GlobalThemeOverrides,
  lightTheme,
} from 'naive-ui'
import { VxeUI } from 'vxe-table'
import { useConfigStoreHook } from '..'

const useThemeStore = defineStore('theme', () => {
  const themeOverrides = ref<GlobalThemeOverrides>({})

  async function updateThemeOverrides() {
    const { name, darkMode } = useConfigStoreHook().config.theme
    const theme = await getThemeOverrides(name, darkMode)
    themeOverrides.value = theme
    const themeVars = toMerged(darkMode ? darkTheme.common : lightTheme.common, theme?.common)
    Object.entries(themeVars).forEach(([key, value]) => {
      window.document.documentElement.style.setProperty(`--n-${kebabCase(key)}`, value as string)
    })
    if (darkMode) {
      window.document.documentElement.classList.add('dark')
      VxeUI.setTheme('dark')
    }
    else {
      window.document.documentElement.classList.remove('dark')
      VxeUI.setTheme('light')
    }
  }

  updateThemeOverrides()

  return {
    themeOverrides,
    updateThemeOverrides,
  }
})

export default useThemeStore
