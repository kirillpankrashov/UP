<template>
  <ElFormItem
    v-if="widget && appStore.domain?.name !== DomainName.STREAMO"
    :label="t('settings.advertSettings.adPlaybackMode')"
  >
    <ElRadioGroup
      v-model="widget.advertising.mode"
      size="large"
    >
      <ElRadioButton label="auto">
        {{ t('settings.advertSettings.playbackModeAuto') }}
      </ElRadioButton>

      <ElRadioButton label="manual">
        {{ t('settings.advertSettings.playbackModeManual') }}
      </ElRadioButton>
    </ElRadioGroup>
  </ElFormItem>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'

import { AdvertisingMode, DomainName } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useAppStore } from '@/core/store'
import { ElFormItem, ElRadioButton, ElRadioGroup } from '@/components/element-plus'
import { messages } from '@/modules/Streamer/views/Settings/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const widget = computed(() => settingsStore.widget)

const checkAvailableModes = () => {
	if (
		widget.value?.advertising.mode === AdvertisingMode.MANUAL &&
		appStore.domain?.name === DomainName.STREAMO
	) {
		widget.value.advertising.mode = AdvertisingMode.AUTO
	}
}

onMounted(() => {
	checkAvailableModes()
})

watch(widget, () => {
	checkAvailableModes()
}, { deep: true })
</script>
