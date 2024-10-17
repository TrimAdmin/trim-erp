import { toMerged } from 'es-toolkit'
import { GlobalThemeOverrides } from 'naive-ui'
import basicTheme from './basic'

const themes = import.meta.glob<{ default: GlobalThemeOverrides }>(['./*.ts', '!./index.ts', '!./basic.ts'], {
  eager: true,
})

export async function getThemeOverrides(name: string) {
  const theme = themes[`./${name ?? 'blue'}.ts`]?.default
  return toMerged(basicTheme, theme)
}
