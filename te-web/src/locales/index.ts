import { createI18n } from 'vue-i18n'

const messages = Object.fromEntries(Object.entries(import.meta.glob<{ default: Record<string, string> }>('./lang/*.json', {
  eager: true,
})).map(([key, value]) => {
  const lang = key.split('/')[2].split('.')[0]
  return [lang, value.default]
}))

const i18n = createI18n({
  legacy: false,
  locale: 'zhCN',
  fallbackLocale: 'zhCN',
  messages,
})

export default i18n
