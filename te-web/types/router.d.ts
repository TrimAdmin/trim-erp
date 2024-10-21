import { UseDataLoader } from 'unplugin-vue-router/runtime'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    titleI18n?: string
    auth?: string
    public?: boolean
    hideMenu?: boolean
    icon?: string
    loaders?: UseDataLoader<boolean, unknown>[]
  }
}

export {}
