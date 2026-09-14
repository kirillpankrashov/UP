<template>
  <DashboardSection
    v-if="widget && widget.platform === Platform.TWITCH"
    id="settings-twitch-extension-section"
    data-test="settings-twitch-extension-section"
    :title="t('settings.twitchExtension.title')"
  >
    <div class="_text-m-regular mb-4">
      {{ t('settings.twitchExtension.description') }}
    </div>

    <div class="_text-m-regular mb-4 flex items-center">
      {{ t('settings.twitchExtension.status') }}&nbsp;
      <ElTag
        class="ml-2"
        size="small"
        effect="dark"
        round
        :type="widget.brandisExtensionEnabled ? 'success' : 'danger'"
      >
        {{ widget.brandisExtensionEnabled ? t('settings.header.enabled') : t('settings.header.disabled') }}
      </ElTag>
    </div>

    <div
      v-if="!widget.brandisExtensionEnabled"
      class="grid gap-4 sm:grid-cols-2"
    >
      <ElButton
        type="primary"
        size="large"
      >
        <a
          class="_text-m-bold no-underline"
          :href="t('links.twitchExtensionBrandis')"
          target="_blank"
        >
          {{ t('settings.twitchExtension.btns.setup') }}
        </a>
      </ElButton>

      <ReloadButton
        data-test="twitch-extension-check-btn"
        @click="settingsStore.checkBrandisExtension"
        :loading="settingsStore.checkingBrandisExtension"
      >
        {{ t('settings.twitchExtension.btns.check') }}
      </ReloadButton>
    </div>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Platform } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ReloadButton } from '@/components'
import { ElButton, ElTag } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)
</script>
