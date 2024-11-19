<script setup lang="ts">
import { MenuOption } from 'naive-ui'
import { RouteNamedMap } from 'vue-router/auto-routes'
import Logo from '/logo.svg'

withDefaults(defineProps<{
  mode?: 'vertical' | 'horizontal'
}>(), {
  mode: 'vertical',
})

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
  <div class="flex-c flex-col">
    <img
      v-if="mode === 'vertical' && configStore.config.feature.showLogo"
      :src="Logo"
      alt="logo"
      class="my-2 h-8 w-8"
    >
    <n-scrollbar>
      <n-menu
        :mode
        :options="menuStore.parentMenu"
        :indent="24"
        :value="defaultValue"
        :render-label="renderLabel"
        :collapsed-width="64"
        :watch-props="['defaultExpandedKeys']"
        :inverted="configStore.config.theme.menuInverted"
        :class="{
          'vertical-menu': mode === 'vertical',
        }"
        @update-value="onMenuChange"
      />
    </n-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.vertical-menu {
  width: 80px;

  :deep(.n-menu-item) {
    height: 64px;
    margin-top: 0;

    .n-menu-item-content {
      width: 64px;
      margin: 8px;
      padding: 0 !important;
      border-radius: var(--n-border-radius);

      &::before {
        display: none;
      }

      &:hover:not(.n-menu-item-content--selected) {
        background-color: var(--n-item-color-hover);
      }

      &--selected {
        background-color: var(--n-item-color-active);
      }

      &__icon {
        margin-right: 0 !important;
      }

      @apply flex-c flex-col;
    }
  }
}
</style>
