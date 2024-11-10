<script setup lang="ts">
withDefaults(defineProps<{
  full?: boolean
  bg?: boolean
}>(), {
  full: true,
})

const slots = useSlots()
</script>

<template>
  <div
    class="page-container"
    :class="{
      'flex-grow flex flex-col': full,
      'bg-bg-card p-4': bg,
      'm-4': !slots.header,
    }"
    :bordered="false"
  >
    <div v-if="slots.header" class="bg-bg-card p-4">
      <slot name="header" />
    </div>
    <div
      :class="{
        'flex-grow flex flex-col': full,
        'm-4': slots.header,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
