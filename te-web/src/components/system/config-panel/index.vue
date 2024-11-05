<script setup lang="ts">
const [show, setShow] = useToggle()

onMounted(() => {
  mitter.on('toggle-config-panel', () => {
    setShow(!show.value)
  })
})

onBeforeUnmount(() => {
  mitter.off('toggle-config-panel')
})

const configStore = useConfigStore()
const { t } = useLocale()

// 复制配置
const configStr = computed<string>(() => JSON.stringify(configStore.config))
const {
  copy,
  copied,
  isSupported,
} = useClipboard({
  source: configStr,
})

async function handleCopyConfig() {
  if (!isSupported.value) {
    message.value.warning(t('toast.not-support-env'))
    return
  }
  await copy(configStr.value)
  if (copied.value) {
    message.value.success(t('toast.config-copy-success'))
  }
}
</script>

<template>
  <n-drawer v-model:show="show" width="480px" auto-focus native-scrollbar block-scroll>
    <n-drawer-content :title="$t('common.config-panel')" closable>
      <n-divider>
        {{ $t('common.config.theme') }}
      </n-divider>
      <template #footer>
        <n-button secondary type="primary" @click="handleCopyConfig">
          {{ $t('btn.copy-config') }}
        </n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style lang="scss" scoped>

</style>
