import type {
  App,
  ComponentPublicInstance,
  Directive,
} from 'vue'
import { useThemeStoreHook } from '@/store'
import { NSpin } from 'naive-ui'

type LoadingProps = boolean
  | {
    show: boolean
    description: string
    size: number | 'medium' | 'small' | 'large' | undefined
    // iconify图标名称
    icon: string
    // 颜色
    color: string
  }

// spin实例
let spinEl: App
// 实例挂载的div元素
let instance: ComponentPublicInstance
// 挂载spin元素的初始position属性
let position: string

function createInstance(binding: { value: LoadingProps }) {
  const description = typeof binding.value === 'boolean' ? '' : binding.value.description || ''
  const size = typeof binding.value === 'boolean' ? 'medium' : binding.value.size || 'medium'
  const icon = typeof binding.value === 'boolean' ? undefined : binding.value.icon
  const color = typeof binding.value === 'boolean' ? undefined : binding.value.color
  const themeStore = useThemeStoreHook()
  // 创建spin实例
  spinEl = createApp(
    h(
      NSpin,
      {
        themeOverrides: {
          ...themeStore.themeOverrides,
          common: {
            ...themeStore.themeOverrides,
            primaryColor: color ?? themeStore.themeOverrides.common?.primaryColor,
          },
        },
        description,
        size,
      },
      icon && {
        icon: () =>
          h('span', {
            class: icon,
          }),
      },
    ),
  )
  // 将实例挂载到div元素
  instance = spinEl.mount(document.createElement('div'))
}

function mount(el: HTMLElement, fullscreen?: boolean) {
  // 全屏时挂载到body
  if (fullscreen) {
    document.documentElement.appendChild(instance.$el)
  }
  else {
    el.style.setProperty(
      'position',
      ['absolute', 'relative', 'fixed'].includes(position) ? position : 'relative',
    )
    el.appendChild(instance.$el)
  }
  // 挂载后触发动画
  setTimeout(() => {
    instance.$el.style.setProperty('opacity', 1)
  }, 0)
}

function unmount(el: HTMLElement, fullscreen?: boolean) {
  if (!instance.$el || !el)
    return
  instance.$el.style.setProperty('opacity', 0)
  // 动画结束后移除元素
  setTimeout(() => {
    if (fullscreen) {
      document.documentElement.removeChild(instance.$el)
    }
    else {
      el.style.setProperty('position', position)
      el.removeChild(instance.$el)
    }
  }, 250)
}

const vLoading: Directive<
  HTMLElement,
  LoadingProps
> = {
  mounted: (el, binding) => {
    const show = typeof binding.value === 'boolean' ? binding.value : binding.value.show
    if (!show)
      return
    createInstance(binding)
    // 添加背景蒙层
    instance.$el.style.setProperty('background-color', 'var(--trim-loading-mask)')
    instance.$el.style.setProperty('transition', 'all 300ms var(--n-cubic-bezier-ease-in-out)')
    instance.$el.style.setProperty('opacity', 0)
    instance.$el.style.setProperty('backdrop-filter', 'blur(2px)')
    // 全屏挂载
    if (binding.modifiers.fullscreen) {
      instance.$el.style.setProperty('position', 'fixed')
      instance.$el.style.setProperty('height', '100vh')
      instance.$el.style.setProperty('width', '100vw')
      instance.$el.style.setProperty('top', '0')
      instance.$el.style.setProperty('left', '0')
      instance.$el.style.setProperty('z-index', '9999')
    }
    else {
      // 元素挂载
      instance.$el.style.setProperty('position', 'absolute')
      instance.$el.style.setProperty('height', '100%')
      instance.$el.style.setProperty('width', '100%')
      instance.$el.style.setProperty('z-index', '9999')
    }

    position = el.style.position
    mount(el, binding.modifiers.fullscreen)
  },
  updated: (el, binding) => {
    const show = typeof binding.value === 'boolean' ? binding.value : binding.value.show
    if (!instance) {
      createInstance(binding)
    }
    if (show) {
      mount(el, binding.modifiers.fullscreen)
    }
    else {
      unmount(el, binding.modifiers.fullscreen)
    }
  },
}

export default vLoading
