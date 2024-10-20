<script setup lang="ts">
import Layout from '@/layout/index.vue'
import {
  darkTheme,
  dateEnUS,
  dateZhCN,
  dateZhTW,
  enUS,
  lightTheme,
  zhCN,
  zhTW,
} from 'naive-ui'
import { useConfigStore, useThemeStore } from './store'

const localeObj = {
  zhCN: [zhCN, dateZhCN],
  zhTW: [zhTW, dateZhTW],
  enUS: [enUS, dateEnUS],
} as const

const themeStore = useThemeStore()
const configStore = useConfigStore()
const router = useRouter()
const [isReady, setIsReady] = useToggle(false)

onMounted(async () => {
  await router.isReady()
  setIsReady(true)
})
</script>

<template>
  <n-config-provider v-if="isReady && themeStore.themeOverrides" namespace="te" :locale="localeObj[configStore.config.locale][0]" :date-locale="localeObj[configStore.config.locale][1]" :theme-overrides="themeStore.themeOverrides" :theme="configStore.config.theme.darkMode ? darkTheme : lightTheme" abstract>
    <Layout />
  </n-config-provider>
</template>

<style scoped>

</style>
