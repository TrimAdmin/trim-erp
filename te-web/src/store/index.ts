import useConfigStore from './modules/config'
import usePermissionStore from './modules/permission'
import useTagsStore from './modules/tags'
import useThemeStore from './modules/theme'

const pinia = createPinia()

export default pinia

export const useConfigStoreHook = () => useConfigStore(pinia)
export const useThemeStoreHook = () => useThemeStore(pinia)
export const useTagsStoreHook = () => useTagsStore(pinia)
export const usePermissionStoreHook = () => usePermissionStore(pinia)

export {
  useConfigStore,
  usePermissionStore,
  useTagsStore,
  useThemeStore,
}
