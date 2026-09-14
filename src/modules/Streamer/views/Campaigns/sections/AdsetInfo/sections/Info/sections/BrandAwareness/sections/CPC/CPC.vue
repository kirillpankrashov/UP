<template>
  <div
    data-test="campaigns-info-brand-awareness-cpc"
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

    <!-- Price per click -->
    <div v-if="props.adset.dailyActionLimit.enabled">
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('campaignSidebar.pricePerClick') }}
      </div>
      <div
        data-test="campaigns-info-price-per-click"
        class="_text-m-regular"
      >
        {{ formatPayout(adset.dailyActionLimit.actionPrice) }}
      </div>
    </div>
    <!-- End of Price per click -->

    <!-- Format -->
    <div>
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('campaignSidebar.adFormat') }}
      </div>
      <div
        data-test="campaigns-info-ad-format"
        class="_text-m-regular"
      >
        {{ format }}
      </div>
    </div>
    <!-- End of Format -->

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

    <!-- Show time -->
    <div v-if="showTime">
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('campaignSidebar.time') }}
      </div>
      <div
        data-test="campaigns-info-show-time"
        class="_text-m-regular"
      >
        {{ showTime }}
      </div>
    </div>
    <!-- End of Show time -->

    <!-- Streamer day limit -->
    <div v-if="streamerDayLimit">
      <div class="_text-s-regular mb-1 text-gray">
        {{ t('campaignRow.streamerDayLimit') }}
        <QuestionTooltip
          :size="12"
          class="!ml-0 align-text-bottom"
        >
          <div class="_text-s-regular">
            {{ t('campaignRow.streamerDayLimitLabel') }}
          </div>
        </QuestionTooltip>
      </div>
      <div
        data-test="campaigns-info-show-time"
        class="_text-m-regular"
      >
        {{ streamerDayLimit }}
      </div>
    </div>
    <!-- End of Streamer day limit -->
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'

import { AdFormat, CurrencyName, Platform } from '@/core/types'
import { useLocale } from '@/core/hooks'
import { useCurrency } from '@/core/hooks'
import { QuestionTooltip } from '@/components'
import type { IBrandAwarenessAdsetInfo } from '@/modules/Streamer/views/Campaigns/api'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const props = defineProps<{
  adset: IBrandAwarenessAdsetInfo
}>()

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency, convertCurrency } = useCurrency()

const streamerStore = useStreamerStore()
const settingsStore = useSettingsStore()

const daysLeft = computed(() => {
	const diff = moment(props.adset.dates.end, 'DD.MM.YYYY').diff(moment(), 'days')
	return diff < 0 ? 0 : diff
})

const advertiser = computed(() => props.adset.campaign?.category || '—')
const streamerCurrency = computed(() => streamerStore.profile?.currency)

const format = computed(() => {
	if ([AdFormat.YANDEX_FS, AdFormat.YANDEX_PF].includes(props.adset.format.id)) {
		return settingsStore.widget?.platform === Platform.TWITCH ? t('campaignRow.format.pip') : t('campaignRow.format.fullscreen')
	}
	return props.adset.format.title
})

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

const showTime = computed(() => {
	const start = props.adset.time.start ? moment(props.adset.time.start, 'HH:mm:ss').format('HH:mm') : null
	const end = props.adset.time.end ? moment(props.adset.time.end, 'HH:mm:ss').format('HH:mm') : null

	if (!start || !end) {
		return null
	}

	return `${start} - ${end}`
})

const streamerDayLimit = computed(() => {
	if (props.adset.streamerDayLimit === null || props.adset.streamerDayLimitShown === null) {
		return null
	}
	return `${props.adset.streamerDayLimitShown} / ${props.adset.streamerDayLimit}`
})
</script>
