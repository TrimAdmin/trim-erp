<script setup lang="ts">
import { cloneDeep } from 'es-toolkit'
import { DataTableInst } from 'naive-ui'

const props = withDefaults(defineProps<{
  columns: TableColumns
  api: string
  autoLoad?: boolean
  searchForm?: Record<string, any>
  seq?: boolean
  checkbox?: boolean
  multiple?: boolean
  size?: 'small' | 'medium' | 'large'
}>(), {
  autoLoad: true,
  seq: true,
  checkbox: true,
  multiple: true,
  size: 'medium',
})

const { t } = useLocale()

const computedColumns = computed<TableColumns>(() => {
  const columns = cloneDeep(props.columns)
  if (props.seq) {
    columns.splice(0, 0, {
      key: 'index',
      title: t('common.seq'),
      render: (_, rowIndex) => rowIndex + 1,
      fixed: 'left',
      align: 'center',
      width: 60,
    })
  }
  if (props.checkbox) {
    columns.splice(0, 0, {
      type: 'selection',
      key: 'checkbox',
      fixed: 'left',
      align: 'center',
      width: 44,
      multiple: props.multiple,
    })
  }
  return columns.map((item) => ({
    ...item,
    ellipsis: item.ellipsis ?? {
      tooltip: true,
    },
    ellipsisComponent: 'ellipsis',
    title: () => h('span', {}, item.title),
  }))
})

const page = ref<number>(1)
const limit = ref<number>(10)
const total = ref<number>(0)

const loading = ref<boolean>(false)
const tableData = ref<any[]>([])
const tableRef = shallowRef<DataTableInst>()

async function getTableData() {
  loading.value = true
  try {
    const { data } = await http.Get<ApiResponsePage>(props.api, {
      params: {
        ...props.searchForm,
        page: page.value,
        limit: limit.value,
      },
    })
    tableData.value = data.list
    total.value = data.total
  }
  finally {
    loading.value = false
  }
}

if (props.autoLoad) {
  getTableData()
}

const checkedRowKeys = defineModel<string[]>('checkedRowKeys')

defineExpose({
  getTableData,
})
</script>

<template>
  <div>
    <n-data-table
      ref="tableRef"
      v-model:checked-row-keys="checkedRowKeys"
      :size
      :row-key="row => row.id"
      :columns="computedColumns"
      :data="tableData"
      :loading
      :single-line="false"
      striped
      :pagination="{
        page,
        onUpdatePage: value => {
          page = value
          getTableData()
        },
        size,
        pageSize: limit,
        onUpdatePageSize: value => {
          limit = value
          getTableData()
        },
        itemCount: total,
        showQuickJumper: true,
        showSizePicker: true,
        displayOrder: ['size-picker', 'pages', 'quick-jumper'],
        pageSizes: [10, 20, 50, 100],
        prefix: () => $t('common.table-total', { value: total }),
        defaultPage: 1,
        defaultPageSize: 10,
      }"
      pagination-behavior-on-filter="first"
      remote
    />
  </div>
</template>

<style lang="scss" scoped>

</style>
