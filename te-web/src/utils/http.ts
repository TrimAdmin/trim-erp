import { useUserStoreHook } from '@/store'
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import VueHook from 'alova/vue'

const { VITE_ENABLE_PROXY, VITE_API_BASE_URL } = import.meta.env

const { t } = useLocale()

const http = createAlova({
  requestAdapter: adapterFetch(),
  statesHook: VueHook,
  baseURL: VITE_ENABLE_PROXY ? '/proxy-api' : VITE_API_BASE_URL,
  beforeRequest(method) {
    method.config.headers.Token = useUserStoreHook().token
  },
  responded: {
    onSuccess: async (res) => {
      try {
        const data = await res.json()
        switch (data?.code) {
          case 200:
            return data
          case 400:
            throw new Error(data.message)
          case 401:
            useUserStoreHook().handleLogout()
            throw new Error(t('require-auth'))
          case 403:
            throw new Error(t('no-permission'))
          default:
            throw new Error(t('common.internal-error'))
        }
      }
      catch (e: any) {
        useModal().message.error(e.message)
      }
    },
    onError: (err) => {
      useModal().message.error(t('common.request-error', {
        reason: err.message,
      }))
    },
  },
})

export default http
