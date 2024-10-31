import useConfigStore from './modules/config'
import usePermissionStore from './modules/permission'
import useTagsStore from './modules/tags'
import useThemeStore from './modules/theme'
import useUserStore from './modules/user'

const pinia = createPinia()

export default pinia

export const useConfigStoreHook = () => useConfigStore(pinia)
export const useThemeStoreHook = () => useThemeStore(pinia)
export const useTagsStoreHook = () => useTagsStore(pinia)
export const usePermissionStoreHook = () => usePermissionStore(pinia)
export const useUserStoreHook = () => useUserStore(pinia)

export {
  useConfigStore,
  usePermissionStore,
  useTagsStore,
  useThemeStore,
  useUserStore,
}
