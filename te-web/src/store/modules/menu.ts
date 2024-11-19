import { MenuOption } from 'naive-ui'

const useMenuStore = defineStore('menu', () => {
  // 侧边栏展示 经过过滤的菜单
  const menu = ref<MenuOption[]>([])
  // 未过滤的菜单
  const wholeMenu = ref<MenuOption[]>([])
  const permissionList = ref<string[]>([])
  // 拍扁的平铺菜单
  // @ts-expect-error not infinity
  const flatMenu = computed<MenuOption[]>(() => getFlatMenu(wholeMenu.value))
  // 一级菜单
  const parentMenu = computed<MenuOption[]>(() => flatMenu.value.filter((item) => !item.parent))

  function getFlatMenu(menuList: MenuOption[], parent?: MenuOption): MenuOption[] {
    return menuList.reduce((res, menu) => {
      res.push({
        ...menu,
        children: undefined,
        parent,
      })
      if (menu.children && menu.children.length) {
        res.push(...getFlatMenu(menu.children, {
          ...menu,
          children: undefined,
        }))
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

  function getParentMenu(routeName: string) {
    const currentMenu = flatMenu.value.find((item) => item.key === routeName)
    if (currentMenu?.parent) {
      return getParentMenu((currentMenu?.parent as MenuOption)?.key as string)
    }
    return currentMenu
  }

  return {
    menu,
    wholeMenu,
    parentMenu,
    permissionList,
    getBreadcrumbList,
    getParentMenu,
  }
})

export default useMenuStore
