import { cloneDeep, toMerged } from 'es-toolkit'
import { MenuOption } from 'naive-ui/es/menu/src/interface'
import { RouteRecordRaw } from 'vue-router'

export function generateMenu(routes: RouteRecordRaw[]): MenuOption[] {
  return routes.filter((route) => !route.meta?.hideMenu).reduce((res: MenuOption[], route) => {
    let menu = cloneDeep(route)
    if (!menu.name && menu.children && menu.children.length) {
      menu = toMerged(menu, menu.children[0])
      menu.children?.splice(0, 1)
    }
    res.push({
      label: menu.meta?.title,
      key: menu.name as string,
      show: !menu.meta?.hideMenu,
      icon: menu.meta?.icon
        ? () => h('span', {
            class: menu.meta?.icon,
          })
        : undefined,
      children: menu.children && menu.children.length ? generateMenu(menu.children) : undefined,
    })
    return res
  }, [] as MenuOption[])
}
