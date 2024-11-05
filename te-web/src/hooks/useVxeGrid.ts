import {
  VxeColumnProps,
  VxeGridInstance,
  VxeGridProps,
  VxeTablePropTypes,
} from 'vxe-table'

interface Props<T> {
  id: string
  columns: VxeColumnProps[]
  data?: T[]
  api?: string
  checkbox?: boolean
  radio?: boolean
  seq?: boolean
  page?: boolean
}

export function useVxeGrid<T extends VxeTablePropTypes.Row>(props: Props<T>) {
  const {
    id,
    columns,
    data,
    api,
    checkbox,
    radio,
    seq = true,
  } = props

  const gridRef = shallowRef<VxeGridInstance>()
  const gridConfig = ref<VxeGridProps>({
    id,
    columns,
    data: data && data.length ? data : [],
    toolbarConfig: {
      refresh: !!api,
    },
    proxyConfig: {
      enabled: !!api,
      seq: true,
      response: {
        list: 'data',
        result: '',
        total: '',
        message: '',
      },
    },
  })

  if (seq) {
    gridConfig.value.columns?.splice(0, 0, {
      type: 'seq',
      width: 60,
      fixed: 'left',
    })
  }

  if (radio) {
    gridConfig.value.columns?.splice(0, 0, {
      type: 'radio',
      width: 44,
      fixed: 'left',
      title: ' ',
    })
  }

  if (checkbox) {
    gridConfig.value.columns?.splice(0, 0, {
      type: 'checkbox',
      width: 44,
      fixed: 'left',
    })
  }

  const checkboxRows = computed(() => [...(gridRef.value?.getCheckboxRecords() ?? []), ...(gridRef.value?.getCheckboxReserveRecords() ?? [])])
  const radioRow = computed(() => gridRef.value?.getRadioRecord())

  return {
    gridRef,
    gridConfig,
    checkboxRows,
    radioRow,
  }
}
