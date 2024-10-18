import { useConfigStoreHook, useThemeStoreHook } from '@/store'
import {
  createDiscreteApi,
  darkTheme,
  type DialogApi,
  lightTheme,
  type MessageApi,
  type ModalApi,
  type NotificationApi,
} from 'naive-ui'

interface Modal {
  dialog: DialogApi
  message: MessageApi
  modal: ModalApi
  notification: NotificationApi
}

const modal = ref<Modal>({} as Modal)

watchPostEffect(() => {
  const dark = useConfigStoreHook().config.theme.darkMode
  modal.value = createDiscreteApi(['dialog', 'message', 'modal', 'notification'], {
    configProviderProps: {
      theme: dark ? darkTheme : lightTheme,
      themeOverrides: useThemeStoreHook().themeOverrides,
    },
  })
})

export function useModal() {
  return modal.value
}
