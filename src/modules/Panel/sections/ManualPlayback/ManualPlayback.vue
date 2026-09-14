<template>
  <ElFormItem
    v-if="widget && widget.advertising.mode === AdvertisingMode.MANUAL"
    data-name="panel-manual-playback"
    :label="t('panel.settings.advertSettings.manualPlaybackTitle')"
  >
    <ElButton
      data-test="panel-manual-playback-btn"
      class="w-full"
      size="large"
      :type="settingsStore.manual.success ? 'success' : 'primary'"
      :disabled="!widget.adManualEnabled"
      :loading="settingsStore.manual.sending"
      @click="settingsStore.sendManual"
    >
      <span class="_text-m-bold">{{ $t('button.runAd') }}</span>
    </ElButton>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { AdvertisingMode } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { ElButton, ElFormItem } from '@/components/element-plus'
import { messages } from '@/modules/Panel/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)
</script>
