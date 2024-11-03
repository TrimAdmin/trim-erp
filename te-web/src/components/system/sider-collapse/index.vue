<script setup lang="ts">
import { useConfigStore } from '@/store'

const configStore = useConfigStore()
</script>

<template>
  <n-tooltip>
    {{ configStore.config.theme.siderCollapsed ? $t('common.unfold-menu') : $t('common.fold-menu') }}
    <template #trigger>
      <div class="h-6 w-6 flex-c text-4 hover:cursor-pointer" @click="configStore.changeSiderCollapsed">
        <i :class="configStore.config.theme.siderCollapsed ? 'i-ant-design:menu-unfold-outlined' : 'i-ant-design:menu-fold-outlined'" />
      </div>
    </template>
  </n-tooltip>
</template>

<style lang="scss" scoped>

</style>
