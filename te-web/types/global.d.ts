import { MenuOption } from 'naive-ui'

declare global {
  type TrimMenuOption = MenuOption & {
    i18n?: string
  }

  type TrimMenuOptionBreadcrumb = TrimMenuOption & {
    parent?: Omit<TrimMenuOption, 'children'>
  }

  interface ApiResponse<T = any> {
    code: number
    data: T
    message: string
    success: boolean
  }

  interface ApiResponsePage<T = any> {
    code: number
    data: {
      limit: number
      page: number
      pages: number
      total: number
      list: T[]
    }
    message: string
    success: boolean
  }

  interface TableConfig {
    [key: string]: {
      columns: []
    } | undefined
  }
}
