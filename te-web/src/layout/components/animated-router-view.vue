<script setup lang="ts">
import { useTagsStore } from '@/store'

const tagsStore = useTagsStore()
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <KeepAlive :include="tagsStore.keepAliveList">
      <Transition name="fade-left" appear mode="out-in">
        <component :is="Component" :key="route.name" />
      </Transition>
    </KeepAlive>
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
