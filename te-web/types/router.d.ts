import { UseDataLoader } from 'unplugin-vue-router/runtime'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    titleI18n?: string
    auth?: string
    public?: boolean
    hideMenu?: boolean
    hideTab?: boolean
    icon?: string
    activeMenu?: string
    loaders?: UseDataLoader<boolean, unknown>[]
  }
}

export {}
