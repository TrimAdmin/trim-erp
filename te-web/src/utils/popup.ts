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

interface Popup {
  dialog: DialogApi
  message: MessageApi
  modal: ModalApi
  notification: NotificationApi
}

const popup = ref<Popup>({} as Popup)

watchPostEffect(() => {
  const dark = useConfigStoreHook().config.theme.darkMode
  popup.value = createDiscreteApi(['dialog', 'message', 'modal', 'notification'], {
    configProviderProps: {
      theme: dark ? darkTheme : lightTheme,
      themeOverrides: useThemeStoreHook().themeOverrides,
    },
  })
})

export const dialog = computed<DialogApi>(() => popup.value.dialog)
export const message = computed<MessageApi>(() => popup.value.message)
export const modal = computed<ModalApi>(() => popup.value.modal)
export const notification = computed<NotificationApi>(() => popup.value.notification)
