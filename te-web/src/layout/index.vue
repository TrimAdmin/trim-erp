<script setup lang="ts">
import { useConfigStore, useUserStoreHook } from '@/store'
import AnimatedRouterView from './components/animated-router-view.vue'
import NormalLayout from './normal/index.vue'

const configStore = useConfigStore()
const userStore = useUserStoreHook()

const layout = computed(() => {
  switch (configStore.config.theme.layout) {
    case 'normal':
      return NormalLayout
    default:
      return NormalLayout
  }
})

userStore.handleGetUserInfo()
</script>

<template>
  <div class="h-full flex flex-col">
    <Component :is="$route.meta?.noLayout ? 'div' : layout">
      <RouterView v-if="$route.meta?.noLayout" />
      <AnimatedRouterView v-else />
    </Component>
  </div>
</template>

<style lang="scss" scoped>

</style>
