import { createI18n } from 'vue-i18n'

const messages = Object.entries(import.meta.glob<{ default: Record<string, object> }>('./lang/**/*.json', {
  eager: true,
})).map(([key, value]) => {
  const lang = key.split('/')[2]
  const namespace = key.split('/')[3].split('.')[0]
  const temp: Record<string, object> = {}
  temp[namespace] = value.default
  return [lang, temp]
}).reduce((res, item) => {
  const [key, locale] = item as unknown as [string, Record<string, string>]
  if (res[key]) {
    res[key] = {
      ...res[key],
      ...locale,
    }
  }
  else {
    res[key] = locale
  }
  return res
}, {} as Record<string, Record<string, string>>)

const i18n = createI18n({
  legacy: false,
  locale: 'zhCN',
  fallbackLocale: 'zhCN',
  messages,
})

export default i18n
