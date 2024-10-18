<script setup lang="ts">
import {
  darkTheme,
  dateZhCN,
  lightTheme,
  zhCN,
} from 'naive-ui'
import { useConfigStore, useThemeStore } from './store'

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
  <n-config-provider v-if="isReady && themeStore.themeOverrides" namespace="te" :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeStore.themeOverrides" :theme="configStore.config.theme.darkMode ? darkTheme : lightTheme" abstract>
    <n-global-style />
    <n-button type="primary" @click="configStore.changeDarkMode">
      test
    </n-button>
    <RouterView />
  </n-config-provider>
</template>

<style scoped>

</style>
