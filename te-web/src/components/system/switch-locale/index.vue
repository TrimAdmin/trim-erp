<script setup lang="ts">
import { useConfigStore } from '@/store'
import { DropdownOption } from 'naive-ui'

const configStore = useConfigStore()

const options = computed<DropdownOption[]>(() => [
  {
    label: '简体中文',
    key: 'zhCN',
    disabled: configStore.config.locale === 'zhCN',
  },
  {
    label: '繁體中文',
    key: 'zhTW',
    disabled: configStore.config.locale === 'zhTW',
  },
  {
    label: 'English',
    key: 'enUS',
    disabled: configStore.config.locale === 'enUS',
  },
])
</script>

<template>
  <n-dropdown :options trigger="click" @select="configStore.changeLocale">
    <i class="i-ri:translate-2" />
  </n-dropdown>
</template>

<style lang="scss" scoped>

</style>
