import { toMerged } from 'es-toolkit'
import { createI18n } from 'vue-i18n'
import enUS from 'vxe-table/lib/locale/lang/en-US'
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import zhTW from 'vxe-table/lib/locale/lang/zh-TW'

// 自动导入国际化
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
  messages: toMerged(messages, {
    zhCN,
    zhTW,
    enUS,
  }),
})

export default i18n
