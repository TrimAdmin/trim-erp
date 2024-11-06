<script setup lang="ts">
const show = ref<boolean>(false)

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 250)
})

onActivated(() => {
  setTimeout(() => {
    show.value = true
  }, 250)
})

onBeforeRouteLeave(() => {
  show.value = false
})
</script>

<template>
  <div v-if="show" v-motion data-calc-fixed :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" :delay="10" :duration="100" class="page-footer">
    <n-button>{{ $t('btn.cancel') }}</n-button>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.page-footer {
  z-index: 1600;
  bottom: 0;
  padding: 8px 16px;
  border-radius: 0;

  @apply bg-bg-card shadow-md dark:shadow-dark;
}
</style>
