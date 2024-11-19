import { UserSearchForm } from '#/system/user'

export function useList() {
  const { t } = useLocale()
  const tableRef = shallowRef<TableInstance>()
  const searchForm = ref<UserSearchForm>({})

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

  function getData() {
    tableRef.value?.getTableData(searchForm.value)
  }

  function onReset() {
    Object.keys(searchForm.value).forEach((key) => {
      searchForm.value[key] = null
    })
    getData()
  }

  const checkedRowKeys = ref<string[]>()

  onActivated(() => {
    getData()
  })

  return {
    columns,
    tableRef,
    getData,
    checkedRowKeys,
    searchForm,
    onReset,
  }
}
