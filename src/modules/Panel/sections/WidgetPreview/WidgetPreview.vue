<template>
  <ElFormItem
    data-name="panel-widget-preview"
    data-test="panel-widget-preview"
    :label="t('panel.params.previewCaption')"
  >
    <ElButton
      class="w-full"
      :type="settingsStore.widgetPreview.success ? 'success' : 'primary'"
      :size="'large'"
      plain
      :loading="settingsStore.widgetPreview.sending"
      @click="settingsStore.sendWidgetPreview"
      :disabled="settingsStore.widgetPreview.success"
    >
      <span class="_text-m-bold">{{ sendingPreviewBtnText }}</span>
    </ElButton>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElButton, ElFormItem } from '@/components/element-plus'
import { messages } from '@/modules/Panel/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const settingsStore = useSettingsStore()

const sendingPreviewBtnText = computed(() => {
	if (settingsStore.widgetPreview.success) {
		return t('button.sendPreview.success')
	}
	if (!settingsStore.widgetPreview.sending) {
		return t('button.sendPreview.static')
	}
	return null
})
</script>
