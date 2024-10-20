import { MenuOption } from 'naive-ui/es/menu/src/interface'

const usePermissionStore = defineStore('permission', () => {
  const menu = ref<MenuOption[]>()
  const permissionList = ref<string[]>()

  return {
    menu,
    permissionList,
  }
})

export default usePermissionStore
