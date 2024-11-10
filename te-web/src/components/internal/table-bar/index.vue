<script setup lang="ts">
import { buttonList } from '@/constants/table'
import { cloneDeep } from 'es-toolkit'
import {
  DropdownOption,
  NRadioButton,
  NRadioGroup,
  NSwitch,
} from 'naive-ui'

const props = withDefaults(defineProps<{
  id: string
  title?: string
  columns: TableColumns
  selectCount?: number
  showSelectCount?: boolean
  rightButtons?: (typeof buttonList[number])[]
}>(), {
  rightButtons: () => ['refresh', 'fullscreen', 'size', 'custom'],
  showSelectCount: true,
  selectCount: 0,
})

const emits = defineEmits<{
  refresh: []
}>()

const [fullscreen, setFullscreen] = useToggle()
const [showCustom, setShowCustom] = useToggle()

const { t } = useLocale()
const slots = useSlots()
const tableStore = useTableStore()

// 抽屉中显示的列数据
const storageColumns = ref<TableColumns>(tableStore.getColumns(props.id, props.columns))

function getTableColumns() {
  return (tableStore.getColumns(props.id, props.columns) ?? props.columns).map((item) => ({
    ...item,
    resizable: item.resizable ?? true,
  })).filter((item) => !item.hide)
}

// 返回给表格的列数据
const tableColumns = ref<TableColumns>(getTableColumns())

// 抽屉中表格的列
const customColumns: TableColumns = [
  {
    title: t('common.column-hide'),
    key: 'hide',
    width: 80,
    align: 'center',
    render: (row, index) => h(NSwitch, {
      value: row.hide as boolean,
      onUpdateValue: (value) => {
        storageColumns.value[index].hide = value
      },
      size: 'small',
    }),
  },
  {
    title: t('common.column-title'),
    key: 'title',
    width: 160,
  },
  {
    title: t('common.align'),
    key: 'align',
    align: 'center',
    render: (row, index) => h(NRadioGroup, {
      value: row.align as string,
      name: 'column-align',
      onUpdateValue: (value) => {
        storageColumns.value[index].align = value
      },
      size: 'small',
    }, [h(NRadioButton, {
      value: 'left',
      label: t('common.align-left'),
    }), h(NRadioButton, {
      value: 'center',
      label: t('common.align-center'),
    }), h(NRadioButton, {
      value: 'right',
      label: t('common.align-right'),
    })]),
  },
  {
    title: t('common.column-fixed'),
    key: 'fixed',
    align: 'center',
    render: (row, index) => h(NRadioGroup, {
      value: row.fixed as string,
      name: 'column-fixed',
      onUpdateValue: (value) => {
        storageColumns.value[index].fixed = value
      },
      size: 'small',
    }, [h(NRadioButton, {
      value: 'left',
      label: t('common.left-fixed'),
    }), h(NRadioButton, {
      value: '',
      label: t('common.not-fixed'),
    }), h(NRadioButton, {
      value: 'right',
      label: t('common.right-fixed'),
    })]),
  },
]

// 设为默认
function handleReset() {
  tableStore.resetColumnConfig(props.id)
  storageColumns.value = cloneDeep(props.columns)
  tableColumns.value = getTableColumns()
  setShowCustom(false)
}

// 确认保存
function handleChangeColumnConfig() {
  tableColumns.value = cloneDeep(storageColumns.value).filter((item) => !item.hide)
  tableStore.upsertColumnConfig(props.id, storageColumns.value)
  setShowCustom(false)
}

// 表格尺寸
const tableSize = ref<'small' | 'medium' | 'large'>('medium')
const tableSizeOptions = computed<DropdownOption[]>(() => [
  {
    key: 'small',
    label: t('common.tight'),
    disabled: tableSize.value === 'small',
  },
  {
    key: 'medium',
    label: t('common.normal'),
    disabled: tableSize.value === 'medium',
  },
  {
    key: 'large',
    label: t('common.loose'),
    disabled: tableSize.value === 'large',
  },
])
</script>

<template>
  <div
    class="table-bar"
    :class="{
      fullscreen,
    }"
  >
    <div v-if="slots.left || slots.right || rightButtons" class="mb-4 flex-bc">
      <div class="flex-c">
        <span v-if="showSelectCount">
          {{ $t('common.table-checked', { value: selectCount }) }}
        </span>
        <slot name="left" />
      </div>
      <div class="flex-c gap-4">
        <slot name="right" />
        <!-- 刷新 -->
        <n-tooltip>
          {{ $t('btn.refresh') }}
          <template #trigger>
            <i v-if="rightButtons.includes('refresh')" class="i-ep:refresh" @click="emits('refresh')" />
          </template>
        </n-tooltip>
        <!-- 尺寸 -->
        <n-dropdown trigger="click" :options="tableSizeOptions" @select="value => tableSize = value">
          <n-tooltip>
            {{ $t('common.table-size') }}
            <template #trigger>
              <i v-if="rightButtons.includes('custom')" class="i-ri:expand-height-line" />
            </template>
          </n-tooltip>
        </n-dropdown>
        <!-- 全屏 -->
        <n-tooltip>
          {{ fullscreen ? $t('btn.exit-fullscreen') : $t('btn.fullscreen') }}
          <template #trigger>
            <i
              v-if="rightButtons.includes('fullscreen')"
              :class="fullscreen ? 'i-ri:fullscreen-exit-line' : 'i-ri:fullscreen-line'"
              @click="setFullscreen(!fullscreen)"
            />
          </template>
        </n-tooltip>
        <!-- 自定义列设置 -->
        <n-tooltip>
          {{ $t('common.custom-columns') }}
          <template #trigger>
            <i v-if="rightButtons.includes('custom')" class="i-ri:list-settings-line" @click="setShowCustom(true)" />
          </template>
        </n-tooltip>
      </div>
    </div>
    <!-- 默认表格插槽 -->
    <slot :storage-columns="tableColumns" :size="tableSize" />
    <!-- 列设置抽屉 -->
    <n-drawer v-model:show="showCustom" width="720px">
      <n-drawer-content :title="$t('common.custom-columns')" closable>
        <n-data-table :data="storageColumns" :columns="customColumns" :single-line="false" />
        <template #footer>
          <n-popconfirm @positive-click="handleReset">
            {{ $t('toast.reset-default') }}
            <template #trigger>
              <n-button class="mr-2">
                {{ $t('btn.reset-default') }}
              </n-button>
            </template>
          </n-popconfirm>
          <n-button class="mr-2" @click="setShowCustom(false)">
            {{ $t('btn.cancel') }}
          </n-button>
          <n-button type="primary" @click="handleChangeColumnConfig">
            {{ $t('btn.confirm') }}
          </n-button>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style lang="scss" scoped>
.table-bar {
  padding: 16px;
  transition: all 250ms var(--n-cubic-bezier-ease-in-out);

  @apply bg-bg-card;

  i {
    position: relative;
    font-size: 18px;
    transition: all 250ms var(--n-cubic-bezier-ease-in-out);

    &:hover {
      cursor: pointer;
      color: var(--n-primary-color);
    }
  }

  &.fullscreen {
    position: fixed;
    z-index: 1900;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    margin-top: 0;
  }
}
</style>
