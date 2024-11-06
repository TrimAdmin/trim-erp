<script setup lang="ts">
import { buttonList } from '@/constants/table'

withDefaults(defineProps<{
  id: string
  title?: string
  rightButtons?: (typeof buttonList[number])[]
}>(), {
  rightButtons: () => ['refresh', 'fullscreen'],
})

const emits = defineEmits<{
  refresh: []
}>()

const [fullscreen, setFullscreen] = useToggle()

const slots = useSlots()
</script>

<template>
  <div
    class="table-bar" :class="{
      fullscreen,
    }"
  >
    <div v-if="slots.left || slots.right || rightButtons" class="mb-4 flex-bc">
      <div>
        {{ title ?? $t('common.list') }}
        <slot name="left" />
      </div>
      <div class="flex-c gap-4">
        <slot name="right" />
        <n-tooltip>
          {{ $t('btn.refresh') }}
          <template #trigger>
            <i v-if="rightButtons.includes('refresh')" class="i-ep:refresh" @click="emits('refresh')" />
          </template>
        </n-tooltip>
        <i v-if="rightButtons.includes('fullscreen')" :class="fullscreen ? 'i-ri:fullscreen-exit-line' : 'i-ri:fullscreen-line'" @click="setFullscreen(!fullscreen)" />
      </div>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.table-bar {
  transition: all 250ms var(--n-cubic-bezier-ease-in-out);

  i {
    font-size: 18px;
    transition: all 250ms var(--n-cubic-bezier-ease-in-out);

    &:hover {
      cursor: pointer;
      color: var(--n-primary-color);
    }
  }

  &.fullscreen {
    position: fixed;
    z-index: 1900;
    inset: 0;
    padding: 16px;
  }
}
</style>
