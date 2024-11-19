<script setup lang="ts">
import OpenSettings from '@/layout/components/header/open-settings.vue'
import UserInfo from '../../components/header/user-info.vue'
import Menu from '../../components/menu.vue'
import Logo from '/logo.svg'

const configStore = useConfigStore()

const { VITE_DOCUMENT_TITLE } = import.meta.env
</script>

<template>
  <n-layout-header
    class="h-header flex-bc px-4"
  >
    <div class="flex flex-grow items-center gap-2">
      <div v-if="configStore.config.feature.showLogo" class="h-header flex-c flex-shrink-0 text-xl">
        <img :src="Logo" alt="logo" class="h-8 w-8">
        <span v-if="!configStore.config.theme.siderCollapsed" class="ml-2">
          {{ VITE_DOCUMENT_TITLE }}
        </span>
      </div>
      <Menu class="flex-grow" mode="horizontal" />
    </div>
    <div class="flex items-center gap-3">
      <ToggleDark />
      <SwitchLocale />
      <OpenSettings />
      <UserInfo />
    </div>
  </n-layout-header>
</template>

<style lang="scss" scoped>

</style>
