<template>
  <ElTag
    data-name="campaigns-adset-card-tags-brand-awareness-format"
    size="small"
    round
  >
    <span class="font-regular">{{ label }}</span>
  </ElTag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Platform } from '@/core/types'
import { isSspMediaFormat } from '@/core/helpers'
import { useLocale } from '@/core/hooks'
import { ElTag } from '@/components/element-plus'
import type { IBrandAwarenessAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const { t } = useLocale<typeof messages>(messages)

const props =defineProps<{
  adset: IBrandAwarenessAdset
}>()

const settingsStore = useSettingsStore()

const label = computed(() => {
	if (isSspMediaFormat(props.adset.format.id)) {
		return settingsStore.widget?.platform === Platform.TWITCH ? t('campaignRow.format.pip') : t('campaignRow.format.fullscreen')
	}
	else {
		return props.adset?.format?.title || t('campaignRow.tags.undefinedFormat')
	}
})
</script>
