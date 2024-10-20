import { UseDataLoader } from 'unplugin-vue-router/runtime'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    public?: boolean
    hideMenu?: boolean
    icon?: string
    loaders?: UseDataLoader<boolean, unknown>[]
  }
}

export {}
