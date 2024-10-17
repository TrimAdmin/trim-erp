import { toMerged } from 'es-toolkit'
import basicTheme from './basic'

export async function getThemeOverrides(name: string) {
  const theme = await import(`./${name ?? 'blue'}.ts`)
  return toMerged(basicTheme, theme?.default)
}
