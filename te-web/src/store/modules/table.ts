import { toMerged } from 'es-toolkit'

const useTableStore = defineStore('table', () => {
  const tableConfig = useLocalStorage<TableConfig>('trim__table-config', {})

  function upsertColumnConfig(id: string, config: TableConfig) {
    tableConfig.value[id] = toMerged(tableConfig.value[id], config)
  }

  function resetColumnConfig(id: string) {
    tableConfig.value[id] = undefined
  }

  return {
    tableConfig,
    upsertColumnConfig,
    resetColumnConfig,
  }
})

export default useTableStore
