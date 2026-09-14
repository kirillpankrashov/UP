<template>
  <div
    data-name="campaigns-adset-card-indicators-brand-awareness"
    class="grid grid-cols-2 gap-4"
  >
    <DailyLimit :adset="adset" />
    <!-- <DailyActionsLimit :adset="adset" /> -->
    <!-- <Revenue :adset="adset" /> -->
    <div class="w-28">
      <div class="_text-caption mb-1">
        {{ t('campaignRow.dateEnd') }}
      </div>
      <div class="_text-m-regular">
        {{ adset.dates.end }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocale } from '@/core/hooks'
import type { IBrandAwarenessAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

import {
	// DailyActionsLimit,
	DailyLimit,
	// Revenue,
} from './sections'

defineProps<{
	adset: IBrandAwarenessAdset
}>()

const { t } = useLocale<typeof messages>(messages)
</script>
