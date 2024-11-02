const useMenuStore = defineStore('menu', () => {
  const menu = ref<TrimMenuOption[]>([])
  const flatMenu = computed<TrimMenuOptionBreadcrumb[]>(() => getFlatMenu(menu.value))

  function getFlatMenu(menuList: TrimMenuOption[]): TrimMenuOptionBreadcrumb[] {
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
    }, [] as TrimMenuOptionBreadcrumb[])
  }

  // 获取面包屑列表
  function getBreadcrumbList(routeName: string) {
    const res: TrimMenuOption[] = []
    getParentMenu(routeName)

    function getParentMenu(routeName: string) {
      const currentMenu = flatMenu.value.find((item) => item.key === routeName)
      if (currentMenu?.parent) {
        getParentMenu(currentMenu?.parent?.key as string)
      }
      if (currentMenu) {
        res.push(currentMenu)
      }
    }

    return res
  }

  return {
    menu,
    getBreadcrumbList,
  }
})

export default useMenuStore
