<script setup lang="ts">
import Breadcrumb from '../components/header/breadcrumb.vue'
import Tags from '../components/tags/index.vue'
import Header from './header/index.vue'

const configStore = useConfigStore()
</script>

<template>
  <n-layout>
    <n-scrollbar>
      <div class="fixed left-0 top-0 z-1600 w-full shadow-md dark:shadow-dark">
        <Header />
        <Tags v-if="configStore.config.feature.showTags" />
      </div>
      <n-layout-content class="pt-header-tags">
        <div
          class="min-h-body relative flex flex-col"
          :class="{
            'has-[.page-footer]:pb-16': !configStore.config.feature.showFooter,
          }"
        >
          <Breadcrumb v-if="configStore.config.feature.showBreadcrumb" class="mx-4 my-2" />
          <slot />
        </div>
        <div v-if="configStore.config.feature.showFooter" class="h-footer flex-c">
          Copyright &copy; 2024-present Trim ERP
        </div>
      </n-layout-content>
      <n-back-top />
    </n-scrollbar>
  </n-layout>
</template>

<style lang="scss" scoped>

</style>
