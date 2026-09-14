<template>
  <div
    data-test="campaigns-info-preroll"
    class="grid gap-6 sm:grid-cols-2"
  >
    <!-- Payment type -->
    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('campaignSidebar.paymentType') }}
      </div>
      <div
        data-test="campaigns-info-payment-type"
        class="_text-m-regular"
      >
        {{ adset.payoutType }}
      </div>
    </div>
    <!-- End of Payment type -->

    <!-- Payable type price -->
    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ adset.payableType === PayoutType.ACTIONS ? t('campaignSidebar.pricePerAction') : t('campaignSidebar.pricePerViews') }}
      </div>
      <div
        data-test="campaigns-info-payable-type-price"
        class="_text-m-regular"
      >
        {{ formatPayout(adset.creatorPayout.value) }}
      </div>
    </div>
    <!-- End of Payable type price -->

    <!-- Advertiser category -->
    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('campaignSidebar.advertiserCategory') }}
      </div>
      <div
        data-test="campaigns-info-advertiser-category"
        class="_text-m-regular"
      >
        {{ advertiser }}
      </div>
    </div>
    <!-- End of Advertiser category -->

    <!-- End date -->
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
    <!-- End of End date -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import { CurrencyName, PayoutType } from '@/core/types'
import { useCurrency, useLocale } from '@/core/hooks'
import type { IPrerollAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'

const props = defineProps<{
  adset: IPrerollAdsetInfo
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency, convertCurrency } = useCurrency()

const streamerStore = useStreamerStore()

const daysLeft = computed(() => {
	const diff = moment(props.adset.dates.end, 'DD.MM.YYYY').diff(moment(), 'days')
	return diff < 0 ? 0 : diff
})

const advertiser = computed(() => props.adset.campaign?.category || '—')
const streamerCurrency = computed(() => streamerStore.profile?.currency)

const showDecimals = computed(() => {
	switch (streamerCurrency.value) {
		case CurrencyName.USD:
		case CurrencyName.EUR:
		case CurrencyName.BRL:
			return true
		default:
			return false
	}
})

const formatPayout = (value: number, decimals = showDecimals.value) => {
	return formatCurrency(convertCurrency(value, props.adset.creatorPayout.currency), decimals)
}
</script>
