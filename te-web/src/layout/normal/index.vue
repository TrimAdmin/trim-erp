<script setup lang="ts">
import Tags from '../components/tags/index.vue'
import Header from './header/index.vue'
import Sider from './sider/index.vue'

const configStore = useConfigStore()
</script>

<template>
  <n-layout has-sider>
    <Sider />
    <n-layout content-class="flex flex-col relative">
      <n-scrollbar>
        <div data-calc-fixed class="shadow-md dark:shadow-dark">
          <Header />
          <Tags v-if="configStore.config.feature.showTags" />
        </div>
        <ConfigPanel />
        <n-layout-content class="pt-header-tags">
          <div
            class="min-h-body relative flex flex-col p-4"
            :class="{
              'has-[.page-footer]:pb-16': !configStore.config.feature.showFooter,
            }"
          >
            <slot />
          </div>
          <div v-if="configStore.config.feature.showFooter" class="h-footer flex-c">
            Copyright &copy; 2024-present Trim ERP
          </div>
        </n-layout-content>
        <n-back-top />
      </n-scrollbar>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>

</style>
