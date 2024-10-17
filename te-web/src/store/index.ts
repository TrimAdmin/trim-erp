import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import useConfigStore from './modules/config'
import useThemeStore from './modules/theme'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

export const useConfigStoreHook = () => useConfigStore(pinia)
export const useThemeStoreHook = () => useThemeStore(pinia)

export { useConfigStore, useThemeStore }
