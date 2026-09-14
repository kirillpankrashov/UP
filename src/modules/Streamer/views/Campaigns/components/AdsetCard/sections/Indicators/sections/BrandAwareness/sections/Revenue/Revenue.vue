<template>
  <div
    data-name="campaigns-adset-card-indicators-brand-awareness-revenue"
  >
    <div class="_text-caption mb-1">
      {{ t('campaignRow.potentialIncome') }}
    </div>
    <div class="_text-m-regular">
      {{ value }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import type { IBrandAwarenessAdset } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const props = defineProps<{
  adset: IBrandAwarenessAdset
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency, convertCurrency } = useCurrency()

const streamerStore = useStreamerStore()

const streamerCurrency = computed(() => streamerStore.profile?.currency)

const value = computed(() => {
	return formatCurrency(convertCurrency(props.adset.estimateIncome, props.adset.currency.adset, streamerCurrency.value), false)
})
</script>
