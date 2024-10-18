import { toMerged } from 'es-toolkit'
import { GlobalThemeOverrides } from 'naive-ui'
import basicTheme from './basic'

const themes = import.meta.glob<{ lightTheme: GlobalThemeOverrides, darkTheme: GlobalThemeOverrides }>(['./*.ts', '!./index.ts', '!./basic.ts'], {
  eager: true,
})

export async function getThemeOverrides(name: string, dark?: boolean) {
  const themeFile = themes[`./${name ?? 'antd'}.ts`]
  const theme = themeFile ? themeFile[dark ? 'darkTheme' : 'lightTheme'] ?? {} : {}
  return toMerged(basicTheme, theme)
}
