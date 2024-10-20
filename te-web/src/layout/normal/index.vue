<script setup lang="ts">
import Header from './header/index.vue'
import Sider from './sider/index.vue'
</script>

<template>
  <n-layout has-sider>
    <Sider />
    <n-layout content-class="flex flex-col relative">
      <Header />
      <n-layout-content>
        <slot />
      </n-layout-content>
      <n-layout-footer>
        footer
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>

</style>
