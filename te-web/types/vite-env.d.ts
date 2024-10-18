/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />
interface ImportMetaEnv {
  readonly VITE_DOCUMENT_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_ENABLE_VUE_DEVTOOLS: string
  readonly VITE_HASH_HISTORY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
