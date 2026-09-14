<template>
  <div
    data-name="campaigns-info-special-project"
    data-test="campaigns-info-special-project"
    class="grid gap-6 sm:grid-cols-2"
  >
    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('campaignSidebar.paymentType') }}
      </div>
      <div
        data-test="campaigns-info-payment-type"
        class="_text-m-regular"
      >
        {{ adset.strategyPayment.title }}
      </div>
    </div>

    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('campaignSidebar.adFormat') }}
      </div>
      <div
        data-test="campaigns-info-format"
        class="_text-m-regular"
      >
        {{ adset.format?.title || '—' }}
      </div>
    </div>

    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('campaignSidebar.date') }}
      </div>
      <div
        data-test="campaigns-info-end-date"
        class="_text-m-regular"
      >
        {{ t('helpers.timeLeft.days', daysLeft) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import { useLocale } from '@/core/hooks'
import type { ISpecialProjectAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'

const props = defineProps<{
  adset: ISpecialProjectAdsetInfo
}>()

const { t } = useLocale<typeof messages>(messages)

const daysLeft = computed(() => {
	const diff = moment(props.adset.dates.end, 'DD.MM.YYYY').diff(moment(), 'days')
	return diff < 0 ? 0 : diff
})
</script>
