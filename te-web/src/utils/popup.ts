import {
  createDiscreteApi,
  darkTheme,
  type DialogApi,
  lightTheme,
  LoadingBarApi,
  type MessageApi,
  type ModalApi,
  type NotificationApi,
} from 'naive-ui'

interface Popup {
  dialog: DialogApi
  message: MessageApi
  modal: ModalApi
  notification: NotificationApi
  loadingBar: LoadingBarApi
}

const popup = ref<Popup>({} as Popup)

watchPostEffect(() => {
  const dark = useConfigStoreHook().config.theme.darkMode
  popup.value = createDiscreteApi(['dialog', 'message', 'modal', 'notification', 'loadingBar'], {
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
export const loadingBar = computed<LoadingBarApi>(() => popup.value.loadingBar)
