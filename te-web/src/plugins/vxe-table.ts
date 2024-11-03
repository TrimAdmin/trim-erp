// @unocss-include
import { App } from 'vue'
import { VxeButton, VxeTooltip } from 'vxe-pc-ui'
import {
  VxeColgroup,
  VxeColumn,
  VxeGrid,
  VxeTable,
  VxeToolbar,
  VxeUI,
} from 'vxe-table'
import 'vxe-table/lib/style.min.css'
import 'vxe-pc-ui/lib/style.min.css'

VxeUI.component(VxeButton)
VxeUI.component(VxeTooltip)

VxeUI.setConfig({
  i18n: (key, args) => useLocale().t(key, args),
  emptyCell: '-',
  table: {
    align: 'center',
    autoResize: true,
    border: 'full',
    keepSource: true,
    round: true,
    showOverflow: true,
    validConfig: {
      showMessage: true,
      autoClear: true,
      autoPos: true,
      msgMode: 'single',
    },
    customConfig: {
      storage: {
        visible: true,
        resizable: true,
        sort: true,
        fixed: true,
      },
      mode: 'drawer',
    },
    columnConfig: {
      resizable: true,
      useKey: true,
    },
    rowConfig: {
      useKey: true,
      keyField: 'row-key',
      isHover: true,
    },
    checkboxConfig: {
      reserve: true,
      highlight: true,
      checkRowKeys: ['id'],
    },
    radioConfig: {
      reserve: true,
      highlight: true,
      checkRowKey: 'id',
      strict: true,
    },
  },
})

VxeUI.setIcon({
  // table
  TABLE_SORT_ASC: 'i-ri:arrow-drop-up-fill',
  TABLE_SORT_DESC: 'i-ri:arrow-drop-down-fill',
  TABLE_FILTER_NONE: 'vxe-table-icon-funnel',
  TABLE_FILTER_MATCH: 'vxe-table-icon-funnel',
  TABLE_EDIT: 'i-ri:edit-line',
  TABLE_TITLE_PREFIX: 'i-ri:question-line',
  TABLE_TITLE_SUFFIX: 'i-ri:question-line',
  TABLE_TREE_LOADED: 'vxe-table-icon-spinner roll',
  TABLE_TREE_OPEN: 'vxe-table-icon-caret-right rotate90',
  TABLE_TREE_CLOSE: 'vxe-table-icon-caret-right',
  TABLE_EXPAND_LOADED: 'vxe-table-icon-spinner roll',
  TABLE_EXPAND_OPEN: 'vxe-table-icon-arrow-right rotate90',
  TABLE_EXPAND_CLOSE: 'vxe-table-icon-arrow-right',
  TABLE_CHECKBOX_CHECKED: 'i-ri:checkbox-line',
  TABLE_CHECKBOX_UNCHECKED: 'i-ri:checkbox-blank-line',
  TABLE_CHECKBOX_INDETERMINATE: 'i-ri:checkbox-indeterminate-line',
  TABLE_RADIO_CHECKED: 'i-ri:radio-button-line',
  TABLE_RADIO_UNCHECKED: 'i-ri:circle-line',
  TABLE_CUSTOM_SORT: 'vxe-table-icon-drag-handle',
  TABLE_MENU_OPTIONS: 'vxe-table-icon-arrow-right',

  // toolbar
  TOOLBAR_TOOLS_REFRESH: 'vxe-table-icon-repeat',
  TOOLBAR_TOOLS_REFRESH_LOADING: 'vxe-table-icon-repeat roll',
  TOOLBAR_TOOLS_IMPORT: 'vxe-table-icon-upload',
  TOOLBAR_TOOLS_EXPORT: 'vxe-table-icon-download',
  TOOLBAR_TOOLS_PRINT: 'vxe-table-icon-print',
  TOOLBAR_TOOLS_FULLSCREEN: 'i-ri:fullscreen-line',
  TOOLBAR_TOOLS_MINIMIZE: 'i-ri:fullscreen-exit-fill',
  TOOLBAR_TOOLS_CUSTOM: 'i-ri:list-settings-line',
  TOOLBAR_TOOLS_FIXED_LEFT: 'i-ri:arrow-left-double-line',
  TOOLBAR_TOOLS_FIXED_LEFT_ACTIVE: 'i-ri:arrow-left-double-fill',
  TOOLBAR_TOOLS_FIXED_RIGHT: 'i-ri:arrow-right-double-line',
  TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVE: 'i-ri:arrow-right-double-fill',
})

export function pluginVxeTable(app: App) {
  [
    VxeGrid,
    VxeColgroup,
    VxeTable,
    VxeColumn,
    VxeToolbar,
  ].forEach((component) => {
    app.use(component)
  })
}
