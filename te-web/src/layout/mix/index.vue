<script setup lang="ts">
import Footer from '../components/footer.vue'
import Breadcrumb from '../components/header/breadcrumb.vue'
import Tags from '../components/tags/index.vue'
import Header from './header/index.vue'
import Sider from './sider/index.vue'

const configStore = useConfigStore()
const siderRef = shallowRef()
const showSider = computed<boolean>(() => siderRef.value?.show)
</script>

<template>
  <n-layout>
    <n-scrollbar>
      <div class="fixed left-0 top-0 z-1600 w-full">
        <Header />
      </div>
      <n-layout has-sider class="pt-header h-full">
        <Sider ref="siderRef" />
        <n-layout-content
          :class="{
            'pl-sider': showSider,
          }"
          class="common-transition"
          content-class="flex flex-col"
        >
          <div
            class="shadow-md transition-property-width dark:shadow-dark"
            :class="{
              'w-full fixed z-1600': !showSider,
            }"
            :data-calc-fixed="showSider"
          >
            <Tags v-if="configStore.config.feature.showTags" />
          </div>
          <div
            class="min-h-body-mix relative flex flex-1 flex-col"
            :class="{
              'has-[.page-footer]:pb-16': !configStore.config.feature.showFooter,
              'pt-tags': configStore.config.feature.showTags,
            }"
          >
            <Breadcrumb class="mx-4 my-2" />
            <slot />
          </div>
          <Footer />
        </n-layout-content>
      </n-layout>
      <n-back-top />
    </n-scrollbar>
  </n-layout>
</template>

<style lang="scss" scoped>

</style>
