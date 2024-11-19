<script setup lang="ts">
import ChildMenu from '../../components/mix/child-menu.vue'

const configStore = useConfigStore()
const childMenuRef = shallowRef()
const show = computed<boolean>(() => !!childMenuRef.value?.menuList?.length)

defineExpose({
  show,
})
</script>

<template>
  <n-layout-sider
    v-show="show"
    :width="configStore.config.theme.siderWidth"
    :collapsed="configStore.config.theme.siderCollapsed"
    :collapsed-width="64"
    collapse-mode="width"
    show-trigger
    class="h-sider-mix fixed z-1700 border-r-1 border-r-border border-r-solid"
    :inverted="configStore.config.theme.menuInverted"
    @collapse="configStore.config.theme.siderCollapsed = true"
    @expand="configStore.config.theme.siderCollapsed = false"
  >
    <ChildMenu ref="childMenuRef" />
  </n-layout-sider>
</template>

<style lang="scss" scoped>

</style>
