<template>
  <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
    <div>
      <div class="_text-caption mb-1">
        {{ t('campaignRow.dailyImpressions') }}
      </div>
      <div class="_text-m-regular">
        {{ formatNumber(adset.impressions, false) }}
      </div>
    </div>

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
import { useCurrency, useLocale } from '@/core/hooks'
import type { IExtensionAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

defineProps<{
	adset: IExtensionAdset
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatNumber } = useCurrency()
</script>
