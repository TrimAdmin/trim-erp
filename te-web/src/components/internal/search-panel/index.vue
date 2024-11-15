<script setup lang="ts">
const emits = defineEmits<{
  refresh: [searchForm: Record<string, any>]
}>()

const searchForm = defineModel<Record<string, any>>({
  default: {},
})

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

const slots = useSlots()

function handleSearch() {
  show.value = false
  emits('refresh', searchForm.value)
}
</script>

<template>
  <div ref="searchPanelRef" class="search-panel">
    <n-form
      :show-feedback="false"
      label-placement="left"
      label-width="100px"
      class="search-panel__form"
      :model="searchForm"
    >
      <slot :search-form />
      <div class="button-group">
        <n-button type="primary" class="mr-3" @click="handleSearch">
          <template #icon>
            <i class="i-ep:search" />
          </template>
          {{ $t('btn.search') }}
        </n-button>
        <n-button class="mr-3" @click="show = !show">
          <template #icon>
            <i class="i-ep:refresh" />
          </template>
          {{ $t('btn.reset') }}
        </n-button>
        <n-button v-if="slots.hide" text @click="show = !show">
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
      <n-collapse-transition :show="show" class="search-panel__hide">
        <div class="search-panel__form">
          <slot name="hide" :search-form />
        </div>
      </n-collapse-transition>
    </n-form>
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
