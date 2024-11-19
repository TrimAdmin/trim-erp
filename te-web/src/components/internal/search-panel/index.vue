<script setup lang="ts">
defineProps<{
  showToggle?: boolean
}>()

const emits = defineEmits<{
  refresh: []
  reset: []
}>()

const show = ref<boolean>(false)
const searchPanelRef = shallowRef<HTMLDivElement>()
const searchPanelHeight = ref<string>()

onMounted(() => {
  searchPanelHeight.value = `${searchPanelRef.value?.clientHeight}px`
  window.addEventListener('resize', () => {
    searchPanelHeight.value = `${searchPanelRef.value?.clientHeight}px`
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
  })
})

function handleSearch() {
  show.value = false
  emits('refresh')
}

function handleReset() {
  show.value = false
  emits('reset')
}
</script>

<template>
  <div ref="searchPanelRef" class="search-panel">
    <slot :show />
    <div class="button-group">
      <n-button
        type="primary"
        ghost
        @click="handleSearch"
      >
        <template #icon>
          <i class="i-ep:search" />
        </template>
        {{ $t('btn.search') }}
      </n-button>
      <n-button ghost @click="handleReset">
        <template #icon>
          <i class="i-ep:refresh" />
        </template>
        {{ $t('btn.reset') }}
      </n-button>
      <n-button
        v-if="showToggle"
        text
        class="ml-3"
        @click="show = !show"
      >
        <template #icon>
          <i
            class="i-ep:caret-bottom transition-transform transition-duration-300"
            :class="{
              'transform-rotate-180': show,
            }"
          />
        </template>
        {{ show ? $t('btn.fold') : $t('btn.unfold') }}
      </n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-panel {
  position: relative;
  padding: 16px;

  @apply bg-bg-card;

  &__form {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: flex-end;

    :deep(.n-form-item) {
      width: 300px;
    }
  }

  .button-group {
    flex-grow: 1;
    width: 100%;
    text-align: right;
  }

  &__hide {
    position: absolute;
    z-index: 1900;
    top: v-bind('searchPanelHeight');
    left: 0;
    padding: 16px;
    border-top: 1px solid;

    @apply bg-bg-card shadow-md dark:shadow-dark  border-t-border;
  }
}
</style>
