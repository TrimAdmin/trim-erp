<script setup lang="ts">
import { useTagsStore } from '@/store'

const tagsStore = useTagsStore()
const refresh = ref<boolean>()

onMounted(() => {
  mitter.on('page-refresh', () => {
    refresh.value = true
    nextTick(() => {
      refresh.value = false
    })
  })
})

onBeforeUnmount(() => {
  mitter.off('page-refresh')
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade-left" appear mode="out-in">
      <KeepAlive :include="tagsStore.keepAliveList">
        <component :is="Component" v-if="!refresh" :key="route.name" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>

<style lang="scss" scoped>
.fade-left-enter-active,
.fade-left-leave-active {
  transform: translateX(0);
  transition: all 300ms var(--n-cubic-bezier-ease-in-out);
}

.fade-left-enter-from {
  transform: translateX(-15px);
  opacity: 0;
}

.fade-left-leave-to {
  transform: translateX(15px);
  opacity: 0;
}
</style>
