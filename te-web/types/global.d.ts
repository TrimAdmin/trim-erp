import { MenuOption } from 'naive-ui'

declare global {
  type TrimMenuOption = MenuOption & {
    i18n?: string
  }

  type TrimMenuOptionBreadcrumb = TrimMenuOption & {
    parent?: Omit<TrimMenuOption, 'children'>
  }
}
