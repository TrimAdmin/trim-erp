import { MenuOption } from 'naive-ui'

const useMenuStore = defineStore('menu', () => {
  const menu = ref<MenuOption[]>([])
  const permissionList = ref<string[]>([])
  // @ts-expect-error not infinity
  const flatMenu = computed<MenuOption[]>(() => getFlatMenu(menu.value))

  function getFlatMenu(menuList: MenuOption[]): MenuOption[] {
    return menuList.reduce((res, menu) => {
      res.push(menu.children && menu.children.length
        ? {
            ...menu,
            children: undefined,
          }
        : menu)
      if (menu.children && menu.children.length) {
        res.push(...getFlatMenu(menu.children).map((item) => ({
          ...item,
          parent: menu,
        })))
      }
      return res
    }, [] as MenuOption[])
  }

  // 获取面包屑列表
  function getBreadcrumbList(routeName: string) {
    const res: MenuOption[] = []
    getParentMenu(routeName)

    function getParentMenu(routeName: string) {
      const currentMenu = flatMenu.value.find((item) => item.key === routeName)
      if (currentMenu?.parent) {
        getParentMenu((currentMenu?.parent as MenuOption)?.key as string)
      }
      if (currentMenu) {
        res.push(currentMenu)
      }
    }

    return res
  }

  return {
    menu,
    permissionList,
    getBreadcrumbList,
  }
})

export default useMenuStore
