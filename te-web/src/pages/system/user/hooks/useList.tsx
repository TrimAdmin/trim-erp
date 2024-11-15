export function useList() {
  const { t } = useLocale()
  const tableRef = shallowRef<TableInstance>()
  const tableSearchForm = ref()

  const columns: TableColumns = [
    {
      key: 'username',
      title: t('system.user.username'),
    },
    {
      key: 'createTime',
      title: t('common.createTime'),
    },
    {
      key: 'updateTime',
      title: t('common.updateTime'),
    },
  ]

  function onSearch() {
    tableRef.value?.getTableData()
  }

  const checkedRowKeys = ref<string[]>()

  return {
    columns,
    tableRef,
    onSearch,
    checkedRowKeys,
    tableSearchForm,
  }
}
