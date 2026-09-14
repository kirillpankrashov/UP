<template>
  <div
    v-if="analyticsStore.data.length"
    data-name="wallet-analytics-graph"
    data-test="wallet-analytics-graph"
    class="mt-6 min-h-[520px] overflow-hidden rounded bg-primary-50 p-6"
  >
    <Bar
      :options="chartOptions"
      :data="chartData"
      :width="400"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	type ChartData,
	type ChartOptions,
	Legend,
	LinearScale,
	LineController,
	LineElement,
	Tooltip,
} from 'chart.js'
import moment from 'moment'

import { LINK_ENABLED } from '@/core/consts'
import { useCurrency, useLocale } from '@/core/hooks'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { messages } from '@/modules/Streamer/views/Wallet/locales'
import { useWalletAnalyticsStore, useWalletStore } from '@/modules/Streamer/views/Wallet/store'

ChartJS.register(BarElement, CategoryScale, Legend, LinearScale, LineController, LineElement, Tooltip)

const { t } = useLocale<typeof messages>(messages)

const { formatCurrency } = useCurrency()

const streamerStore = useStreamerStore()
const walletStore = useWalletStore()
const analyticsStore = useWalletAnalyticsStore()
const wallet = computed(() => walletStore.wallet)

const chartData = computed<ChartData<'bar'>>(() => {
	return {
		labels: analyticsStore.data.map((_, i) => ++i),
		datasets: [
			{
				label: t('wallet.analytics.categories.awareness'),
				data: analyticsStore.data.map(item => item.brandAwareness),
				categoryPercentage: 1.0,
				barPercentage: 0.99,
				backgroundColor: '#13BF34',
			},
			{
				label: t('wallet.analytics.categories.actions'),
				data: analyticsStore.data.map(item => item.cpaTargetActions),
				categoryPercentage: 1.0,
				barPercentage: 0.99,
				backgroundColor: '#266FFE',
			},
			{
				label: t('wallet.analytics.categories.extension'),
				data: analyticsStore.data.map(item => item.extension),
				categoryPercentage: 1.0,
				barPercentage: 0.99,
				backgroundColor: '#8723EE',
			},
			...(LINK_ENABLED && streamerStore.profile?.freemiumActive ? [{
				label: t('wallet.analytics.categories.freemium'),
				data: analyticsStore.data.map(item => item.freemium),
				categoryPercentage: 1.0,
				barPercentage: 0.99,
				backgroundColor: '#FFCE0A',
			}] : []),
			{
				label: t('wallet.analytics.categories.referrals'),
				data: analyticsStore.data.map(item => item.referral),
				categoryPercentage: 1.0,
				barPercentage: 0.99,
				backgroundColor: '#22CAFF',
			},
			{
				label: t('wallet.analytics.categories.youtube_text'),
				data: analyticsStore.data.map(item => item.youtubeText),
				categoryPercentage: 1.0,
				barPercentage: 0.99,
				backgroundColor: '#F23D3D',
			},
		],
	}
})

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		x: {
			stacked: true,
			grid: {
				display: false,
			},
		},
		y: {
			stacked: true,
			display: false,
		},
	},
	plugins: {
		legend: {
			position: 'bottom',
			labels: {
				padding: 20,
				pointStyle: 'circle',
				usePointStyle: true,
			},
		},
		tooltip: {
			callbacks: {
				title (ctx: any) {
					return moment(analyticsStore.data[ctx[0].dataIndex].date, 'YYYY-MM-DD').format('DD.MM')
				},
				label (ctx: any) {
					return formatCurrency(ctx.raw, false, wallet.value?.currency)
				},
			},
		},
	},
}))
</script>
