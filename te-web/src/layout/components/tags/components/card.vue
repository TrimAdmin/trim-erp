<script setup lang="ts">
import { RouteRecordRaw } from 'vue-router'

defineProps<{
  tab: RouteRecordRaw
  active: boolean
  closable: boolean
}>()

const emits = defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="trim-tabs__card" :class="[{ 'trim-tabs__card-active': active }]">
    <div class="flex-c">
      <span :class="tab.meta?.icon" class="mr-1" />
      {{ tab.meta?.titleI18n ? $t(tab.meta?.titleI18n) : tab.meta?.title }}
    </div>
    <span v-if="closable" class="close" @click.stop="emits('close')">
      <i class="i-ep:close" />
    </span>
  </div>
</template>

<style scoped lang="scss">
.trim-tabs__card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
  height: 32px;
  padding: 0 8px;
  font-size: 14px;
  line-height: 32px;
  color: var(--n-text-color-3);
  border-radius: var(--n-border-radius);
  transition: all 250ms var(--n-cubic-bezier-ease-in-out);

  & + & {
    margin-left: 6px;
  }

  .close {
    width: 16px;
    height: 16px;
    margin-left: 4px;
    font-size: var(--n-font-size-tiny);
    color: var(--n-text-color-3);
    border: 1px solid transparent;
    border-radius: 50%;
    transition: all 250ms var(--n-cubic-bezier-ease-in-out);

    @apply flex-c;

    &:hover {
      background-color: var(--n-tag-color);
      border: 1px solid var(--n-border-color);
    }
  }

  &-active {
    color: var(--n-primary-color);
    background-color: var(--n-card-color);

    .close {
      color: var(--n-text-color-1);
    }
  }

  &:hover {
    cursor: pointer;
  }

  &:not(&-active):hover {
    color: var(--n-primary-color-hover);
    background-color: var(--n-tag-color);
  }
}
</style>
