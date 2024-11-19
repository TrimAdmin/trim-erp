<script setup lang="ts">
import { themeList } from '@/constants/system'

const [show, setShow] = useToggle()

onMounted(() => {
  mitter.on('toggle-config-panel', () => {
    setShow(!show.value)
  })
})

onBeforeUnmount(() => {
  mitter.off('toggle-config-panel')
})

const configStore = useConfigStore()
const { t } = useLocale()

// 复制配置
const configStr = computed<string>(() => JSON.stringify(configStore.config))
const {
  copy,
  copied,
  isSupported,
} = useClipboard({
  source: configStr,
})

// 复制配置
async function handleCopyConfig() {
  if (!isSupported.value) {
    message.value.warning(t('toast.not-support-env'))
    return
  }
  await copy(configStr.value)
  if (copied.value) {
    message.value.success(t('toast.config-copy-success'))
  }
}

// 重置配置
function handleResetConfig() {
  localStorage.removeItem('trim__config')
  nextTick(() => {
    window.location.reload()
  })
}
</script>

<template>
  <n-drawer
    v-model:show="show"
    width="400px"
    auto-focus
    native-scrollbar
    block-scroll
  >
    <n-drawer-content :title="$t('common.config-panel')" closable>
      <n-divider>
        {{ $t('common.config.theme') }}
      </n-divider>
      <n-list hoverable :show-divider="false">
        <n-list-item>
          <div class="flex-bc">
            <span>{{ $t('common.config.dark-mode') }}</span>
            <n-switch :value="configStore.config.theme.darkMode" @update:value="configStore.changeDarkMode">
              <template #checked-icon>
                <i class="i-ri:moon-line" />
              </template>
              <template #unchecked-icon>
                <i class="i-ri:sun-line" />
              </template>
            </n-switch>
          </div>
        </n-list-item>
        <n-list-item v-if="configStore.config.layout !== 'top'" v-motion-slide-left>
          <div class="flex-bc">
            <span>{{ $t('common.config.sider-inverted') }}</span>
            <n-switch v-model:value="configStore.config.theme.siderInverted" :disabled="configStore.config.theme.darkMode" />
          </div>
        </n-list-item>
        <n-list-item>
          <div class="flex-bc">
            <span>{{ $t('common.config.theme') }}</span>
            <n-select :value="configStore.config.theme.name" :options="themeList as any" @update:value="configStore.changeTheme" />
          </div>
        </n-list-item>
        <n-list-item>
          <div class="flex-bc">
            <span>{{ $t('common.config.sider-width') }}</span>
            <n-input-number
              v-model:value="configStore.config.theme.siderWidth"
              :precision="0"
              :min="200"
              :max="360"
              @blur="() => {
                if (!configStore.config.theme.siderWidth) {
                  configStore.config.theme.siderWidth = 240
                }
              }"
            />
          </div>
        </n-list-item>
        <n-list-item>
          <div class="flex-bc">
            <span>{{ $t('common.config.header-height') }}</span>
            <n-input-number
              v-model:value="configStore.config.theme.headerHeight"
              :precision="0"
              :min="48"
              :max="96"
              @blur="() => {
                if (!configStore.config.theme.headerHeight) {
                  configStore.config.theme.headerHeight = 48
                }
              }"
            />
          </div>
        </n-list-item>
      </n-list>
      <n-divider>
        {{ $t('common.config.layout') }}
      </n-divider>
      <n-list :show-divider="false">
        <n-list-item>
          <div class="flex-c flex-wrap gap-3">
            <n-tooltip>
              {{ $t('common.config.layout-normal') }}
              <template #trigger>
                <div
                  class="layout"
                  :class="{
                    active: configStore.config.layout === 'normal',
                  }"
                  @click="configStore.config.layout = 'normal'"
                >
                  <div class="layout-normal" />
                </div>
              </template>
            </n-tooltip>
            <n-tooltip>
              {{ $t('common.config.layout-top') }}
              <template #trigger>
                <div
                  class="layout"
                  :class="{
                    active: configStore.config.layout === 'top',
                  }"
                  @click="configStore.config.layout = 'top'"
                >
                  <div class="layout-top" />
                </div>
              </template>
            </n-tooltip>
          </div>
        </n-list-item>
      </n-list>
      <n-divider>
        {{ $t('common.config.feature') }}
      </n-divider>
      <n-list hoverable :show-divider="false">
        <n-list-item>
          <div class="flex-bc">
            <span>{{ $t('common.config.show-footer') }}</span>
            <n-switch v-model:value="configStore.config.feature.showFooter" />
          </div>
        </n-list-item>
        <n-list-item>
          <div class="flex-bc">
            <span>{{ $t('common.config.show-logo') }}</span>
            <n-switch v-model:value="configStore.config.feature.showLogo" />
          </div>
        </n-list-item>
        <n-list-item>
          <div class="flex-bc">
            <span>{{ $t('common.config.show-tags') }}</span>
            <n-switch v-model:value="configStore.config.feature.showTags" />
          </div>
        </n-list-item>
        <n-list-item>
          <div class="flex-bc">
            <span>{{ $t('common.config.show-breadcrumb') }}</span>
            <n-switch v-model:value="configStore.config.feature.showBreadcrumb" />
          </div>
        </n-list-item>
        <n-list-item>
          <div class="flex-bc">
            <span>{{ $t('common.config.cache-tabs') }}</span>
            <n-switch v-model:value="configStore.config.feature.cacheTabs" />
          </div>
        </n-list-item>
      </n-list>
      <template #footer>
        <n-popconfirm @positive-click="handleResetConfig">
          {{ $t('toast.reset-default') }}
          <template #trigger>
            <n-button secondary>
              {{ $t('btn.reset-config') }}
            </n-button>
          </template>
        </n-popconfirm>
        <n-button secondary type="primary" @click="handleCopyConfig">
          {{ $t('btn.copy-config') }}
        </n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style lang="scss" scoped>
.n-divider {
  margin: 12px 0;
}

.n-select,
.n-input-number {
  width: 160px;
}

.layout {
  position: relative;
  width: 72px;
  height: 52px;
  padding: 8px;
  border: 2px solid var(--n-border-color);
  border-radius: var(--n-border-radius);
  transition: all 250ms var(--n-cubic-bezier-ease-in-out);

  .layout-normal {
    position: absolute;
    width: 16px;
    height: 32px;
    background-color: var(--n-primary-color);

    &::before {
      content: ' ';
      position: absolute;
      left: 16px;
      width: 36px;
      height: 8px;
      background-color: var(--n-primary-color-hover);
    }

    &::after {
      content: ' ';
      position: absolute;
      top: 8px;
      left: 16px;
      width: 34px;
      height: 22px;
      border: 1px dashed var(--n-primary-color-pressed);
    }
  }

  .layout-top {
    display: block;
    height: 12px;
    background-color: var(--n-primary-color);

    &::before {
      content: ' ';
      position: absolute;
      top: 20px;
      display: block;
      width: 50px;
      height: 18px;
      border: 1px dashed var(--n-primary-color-pressed);
    }
  }

  &.active {
    border-color: var(--n-primary-color);
  }

  &:hover {
    cursor: pointer;
  }

  &:not(&.active):hover {
    border-color: var(--n-primary-color-hover);
  }
}
</style>
