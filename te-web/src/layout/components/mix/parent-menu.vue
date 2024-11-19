<script setup lang="ts">
import { MenuOption } from 'naive-ui'
import { RouteNamedMap } from 'vue-router/auto-routes'

defineProps<{
  mode?: 'vertical' | 'horizontal'
}>()

const menuStore = useMenuStore()
const router = useRouter()
const { t } = useLocale()

function onMenuChange(name: keyof RouteNamedMap) {
  router.push({
    name,
  })
}

function renderLabel(menu: MenuOption) {
  return menu.i18n ? t(menu.i18n as string) : menu.label as string
}

const route = useRoute()

const defaultValue = computed<string>(() => menuStore.getParentMenu(route.name)?.key as string ?? '')
const configStore = useConfigStore()
</script>

<template>
  <n-menu
    :mode
    :options="menuStore.parentMenu"
    :indent="24"
    :value="defaultValue"
    :render-label="renderLabel"
    :collapsed-width="64"
    :watch-props="['defaultExpandedKeys']"
    :inverted="configStore.config.theme.menuInverted"
    @update-value="onMenuChange"
  />
</template>

<style lang="scss" scoped>

</style>
