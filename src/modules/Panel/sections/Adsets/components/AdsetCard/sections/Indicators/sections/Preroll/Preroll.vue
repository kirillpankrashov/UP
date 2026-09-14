<template>
  <div
    data-name="campaigns-adset-card-indicators-preroll"
    class="grid grid-cols-2 gap-4"
  >
    <div v-if="adset.payableType === PayoutType.ACTIONS">
      <div class="_text-caption mb-1">
        {{ t('campaignRow.dailyActions') }}
      </div>
      <div class="_text-m-regular">
        {{ formatNumber(adset.actions, false) }}
      </div>
    </div>

    <div v-if="adset.payableType === PayoutType.IMPRESSIONS">
      <div class="_text-caption mb-1">
        {{ t('campaignRow.dailyImpressions') }}
      </div>
      <div class="_text-m-regular">
        {{ formatNumber(adset.impressions.creator, false) }}
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
import { PayoutType } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import type { IPrerollAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

defineProps<{
	adset: IPrerollAdset
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatNumber } = useCurrency()
</script>
