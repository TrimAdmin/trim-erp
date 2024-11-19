<script setup lang="ts">
import { useConfigStore } from '@/store'
import AnimatedRouterView from './components/animated-router-view.vue'
import DoubleColumnsLayout from './double-columns/index.vue'
import MixLayout from './mix/index.vue'
import NormalLayout from './normal/index.vue'
import TopLayout from './top/index.vue'

const configStore = useConfigStore()

const layout = computed(() => {
  switch (configStore.config.layout) {
    case 'normal':
      return NormalLayout
    case 'top':
      return TopLayout
    case 'mix':
      return MixLayout
    case 'double-columns':
      return DoubleColumnsLayout
    default:
      return NormalLayout
  }
})
</script>

<template>
  <div class="h-full flex flex-col">
    <Component :is="$route.meta?.noLayout ? 'div' : layout">
      <RouterView v-if="$route.meta?.noLayout" />
      <AnimatedRouterView v-else />
    </Component>
    <ConfigPanel />
  </div>
</template>

<style lang="scss" scoped>

</style>
