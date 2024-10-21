<script setup lang="ts">
import { useConfigStore } from '@/store'

const configStore = useConfigStore()
</script>

<template>
  <n-tooltip>
    {{ configStore.config.theme.siderCollapsed ? $t('common.unfold-menu') : $t('common.fold-menu') }}
    <template #trigger>
      <n-button circle quaternary @click="configStore.changeSiderCollapsed">
        <i :class="configStore.config.theme.siderCollapsed ? 'i-ant-design:menu-unfold-outlined' : 'i-ant-design:menu-fold-outlined'" />
      </n-button>
    </template>
  </n-tooltip>
</template>

<style lang="scss" scoped>

</style>
