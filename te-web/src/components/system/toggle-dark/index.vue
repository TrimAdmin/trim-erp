<script setup lang="ts">
import { useConfigStore } from '@/store'

const configStore = useConfigStore()

function handleViewTransition(e: MouseEvent) {
  if (!document.startViewTransition) {
    configStore.changeDarkMode()
    return
  }
  const transition = document.startViewTransition(() => {
    configStore.changeDarkMode()
  })

  // 新的视图过渡动画
  transition.ready.then(() => {
    // 点击位置
    const clickX = e.clientX ?? innerWidth / 2
    const clickY = e.clientY ?? innerHeight / 2
    // 计算点击位置到最远角的距离
    const endRadius = Math.hypot(
      Math.max(clickX, innerWidth - clickX),
      Math.max(clickY, innerHeight - clickY),
    )

    const clipPath = [
      `circle(0 at ${clickX}px ${clickY}px)`,
      `circle(${endRadius}px at ${clickX}px ${clickY}px)`,
    ]

    document.documentElement.animate(
      {
        // 切换暗色模式时向内收缩，切换亮色模式时向外展开
        clipPath: configStore.config.theme.darkMode ? clipPath.reverse() : clipPath,
      },
      {
        duration: 300,
        easing: configStore.config.theme.darkMode ? 'ease-out' : 'ease-in',
        // 指定要附加动画的伪元素，切换暗色模式时将旧视图置于顶层
        pseudoElement: configStore.config.theme.darkMode
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <n-tooltip>
    {{ configStore.config.theme.darkMode ? $t('common.light-mode') : $t('common.dark-mode') }}
    <template #trigger>
      <div
        class="h-6 w-6 flex-c text-4 hover:cursor-pointer"
        @click="handleViewTransition"
      >
        <i :class="configStore.config.theme.darkMode ? 'i-ant-design:sun-outlined' : 'i-ant-design:moon-outlined'" />
      </div>
    </template>
  </n-tooltip>
</template>

<style lang="scss" scoped></style>
