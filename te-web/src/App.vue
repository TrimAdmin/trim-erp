<script setup lang="ts">
import { useThemeStore } from './store'

const themeStore = useThemeStore()
const router = useRouter()
const [isReady, setIsReady] = useToggle(false)

onMounted(async () => {
  await router.isReady()
  setIsReady(true)
})
</script>

<template>
  <n-config-provider v-if="isReady && themeStore.themeOverrides" :theme-overrides="themeStore.themeOverrides" tag="div">
    <n-global-style />
    <n-button type="primary">
      test啊啊
    </n-button>
  </n-config-provider>
</template>

<style scoped>

</style>
