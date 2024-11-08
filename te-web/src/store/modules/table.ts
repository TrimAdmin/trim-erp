const useTableStore = defineStore('table', () => {
  const tableConfig = useLocalStorage<TableConfig>('trim__table-config', {})

  function getColumns(id: string, columns: TableColumns) {
    const config = tableConfig.value[id]
    if (config) {
      return columns.map((item) => {
        if (config?.hideColumns.includes(item.key)) {
          item.hide = true
        }
        if (Object.keys(config.fixed ?? {}).includes(item.key)) {
          item.fixed = config.fixed[item.key]
        }
        if (Object.keys(config.align ?? {}).includes(item.key)) {
          item.align = config.align[item.key]
        }
        if (Object.keys(config.width ?? {}).includes(item.key)) {
          item.width = config.width[item.key]
        }
        return item
      })
    }
    return columns
  }

  function upsertColumnConfig(id: string, columns: TableColumns) {
    tableConfig.value[id] = {
      hideColumns: columns.map((item) => item.hide ? item.key : '').filter(Boolean),
      fixed: Object.fromEntries(columns.map((item) => {
        if (item.fixed)
          return [item.key, item.fixed]
        return []
      })),
      width: Object.fromEntries(columns.map((item) => {
        if (item.width)
          return [item.key, item.width]
        return []
      })),
      align: Object.fromEntries(columns.map((item) => {
        if (item.align)
          return [item.key, item.align]
        return []
      })),
    }
  }

  function resetColumnConfig(id: string) {
    tableConfig.value[id] = undefined
  }

  return {
    tableConfig,
    upsertColumnConfig,
    resetColumnConfig,
    getColumns,
  }
})

export default useTableStore
