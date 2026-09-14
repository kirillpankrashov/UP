<template>
  <div id="settings-widgetlink-widgetpreview">
    <div
      v-if="label"
      class="el-form-item__label"
    >
      {{ label }}
    </div>

    <ElButton
      class="w-full sm:w-auto"
      :type="settingsStore.widgetPreview.success ? 'success' : 'primary'"
      :size="'large'"
      plain
      :loading="settingsStore.widgetPreview.sending"
      @click="settingsStore.sendWidgetPreview"
      :disabled="settingsStore.widgetPreview.success"
    >
      <span class="_text-m-bold">{{ sendingPreviewBtnText }}</span>
    </ElButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElButton } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

defineProps<{
	label?: string
}>()

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
