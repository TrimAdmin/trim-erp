import { MenuOption } from 'naive-ui'
import { TableColumn } from 'naive-ui/es/data-table/src/interface'

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
    data: PageData<T>
    message: string
    success: boolean
  }

  interface PageData<T = any> {
    limit: number
    page: number
    pages: number
    total: number
    list: T[]
  }

  type TableColumns<T = any> = (TableColumn<T> & {
    hide?: boolean
    key: string
  })[]

  interface TableConfig {
    [key: string]: {
      hideColumns: string[]
      fixed: Record<string, 'left' | 'right' | undefined>
      align: Record<string, 'left' | 'right' | 'center'>
      width: Record<string, number>
    } | undefined
  }

  interface TableInstance {
    getTableData: () => void
  }
}
