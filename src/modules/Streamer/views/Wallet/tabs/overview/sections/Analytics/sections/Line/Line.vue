<template>
  <div
    data-name="wallet-analytics-line"
    data-test="wallet-analytics-line"
    class="mt-6"
  >
    <div class="mb-4 font-bold">
      {{ t('wallet.analytics.source.title') }}
    </div>

    <div class="mb-4 flex">
      <div
        v-for="item in categories"
        :key="item.id"
        class="mr-1 h-12 rounded"
        :style="`width: calc(${item.percent}% - 2px); background-color: ${item.color};`"
      />
    </div>

    <div class="sm:flex">
      <div
        v-for="item in categories"
        :key="item.id"
        class="relative grow"
      >
        <div
          class="relative left-0 top-4 h-2 w-2 rounded-full"
          :style="`background-color: ${item.color}`"
        />
        <div class="mb-2 pl-4 text-2xl/[1]">
          {{ formatCurrency(item.sum, false, wallet?.currency) }}
        </div>
        <div class="_text-s-regular pl-4">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { LINK_ENABLED } from '@/core/consts'
import { useCurrency, useLocale } from '@/core/hooks'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import type { IWalletAnalyticsDay } from '@/modules/Streamer/views/Wallet/api'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletAnalyticsStore, useWalletStore } from '@/modules/Streamer/views/Wallet/store'

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const streamerStore = useStreamerStore()
const walletStore = useWalletStore()
const analyticsStore = useWalletAnalyticsStore()
const wallet = computed(() => walletStore.wallet)

const colors = ['#13BF34', '#266FFE', '#8723EE', '#FFCE0A', '#22CAFF', '#F23D3D']

const getCategoryTotal = (key: keyof Omit<IWalletAnalyticsDay, 'date'>) => {
	return analyticsStore.data.map(item => item[key]).reduce((partialSum, a) => partialSum + a, 0)
}

const getPercent = (total: number, current: number) => {
	return (current * 100 / total) || 0
}

const categories = computed(() => {
	const awareness = getCategoryTotal('brandAwareness')
	const extension = getCategoryTotal('extension')
	const actions = getCategoryTotal('cpaTargetActions')
	const freemium = getCategoryTotal('freemium')
	const referrals = getCategoryTotal('referral')
	const youtubeText = getCategoryTotal('youtubeText')

	const total = awareness + extension + actions + freemium + referrals + youtubeText

	return [
		{
			id: 1,
			percent: getPercent(total, awareness),
			sum: awareness,
			name: t('wallet.analytics.categories.awareness'),
			color: colors[0],
		},
		{
			id: 2,
			percent: getPercent(total, actions),
			sum: actions,
			name: t('wallet.analytics.categories.actions'),
			color: colors[1],
		},
		{
			id: 3,
			percent: getPercent(total, extension),
			sum: extension,
			name: t('wallet.analytics.categories.extension'),
			color: colors[2],
		},
		...(LINK_ENABLED && streamerStore.profile?.freemiumActive ? [{
			id: 4,
			percent: getPercent(total, freemium),
			sum: freemium,
			name: t('wallet.analytics.categories.freemium'),
			color: colors[3],
		}] : []),
		{
			id: 5,
			percent: getPercent(total, referrals),
			sum: referrals,
			name: t('wallet.analytics.categories.referrals'),
			color: colors[4],
		},
		{
			id: 6,
			percent: getPercent(total, youtubeText),
			sum: youtubeText,
			name: t('wallet.analytics.categories.youtube_text'),
			color: colors[5],
		},
	]
})
</script>
