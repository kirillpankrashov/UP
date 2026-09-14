<template>
  <div
    v-if="value"
    data-name="campaigns-adset-card-indicators-brand-awareness-time"
  >
    <div class="_text-caption mb-1">
      {{ t('campaignRow.time') }}
    </div>
    <div class="_text-m-regular">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import { useLocale } from '@/core/hooks'
import type { IBrandAwarenessAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

const props = defineProps<{
  adset: IBrandAwarenessAdset
}>()

const { t } = useLocale<typeof messages>(messages)

const value = computed(() => {
	const start = props.adset.time.start ? moment(props.adset.time.start, 'HH:mm:ss').format('HH:mm') : null
	const end = props.adset.time.end ? moment(props.adset.time.end, 'HH:mm:ss').format('HH:mm') : null

	if (!start || !end) {
		return null
	}

	return `${start} - ${end}`
})
</script>
