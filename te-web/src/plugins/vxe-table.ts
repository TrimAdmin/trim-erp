import { App } from 'vue'
import {
  Edit,
  VxeColgroup,
  VxeColumn,
  VxeGrid,
  VxePager,
  VxeTable,
  VxeToolbar,
  VxeUI,
} from 'vxe-table'
import 'vxe-table/styles/all.scss'

VxeUI.setConfig({
  i18n: (key, args) => useLocale().t(key, args),
})

export function pluginVxeTable(app: App) {
  app.use(VxeTable)
  app.use(VxeColgroup)
  app.use(VxeColumn)
  app.use(VxeGrid)
  app.use(VxePager)
  app.use(VxeToolbar)
  app.use(Edit)
}
