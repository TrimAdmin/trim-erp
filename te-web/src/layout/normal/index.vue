<script setup lang="ts">
import Tags from '../components/tags/index.vue'
import Header from './header/index.vue'
import Sider from './sider/index.vue'
</script>

<template>
  <n-layout has-sider>
    <Sider />
    <n-layout content-class="flex flex-col relative">
      <Tags />
      <Header />
      <ConfigPanel />
      <n-layout-content content-class="p-4">
        <slot />
      </n-layout-content>
      <n-layout-footer>
        <div class="py-4 text-center">
          Copyright &copy; 2024-present Trim ERP
        </div>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>

</style>
