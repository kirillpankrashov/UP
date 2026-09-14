<template>
  <div
    id="campaigns-analytics-graph"
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
import { computed, ref, watch } from 'vue'
import { Bar } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineController,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js'
import moment from 'moment'

import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'

const { t } = useLocale<typeof messages>(messages)

ChartJS.register(
	Title,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	LineElement,
	LineController,
	PointElement,
)

const analyticsStore = useCampaignAnalyticsStore()

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
	responsive: true,
	maintainAspectRatio: false,
	scales: {
		x: {
			grid: {
				display: false,
			},
			stacked: true,
			ticks: {
				display: true,
				autoSkip: true,
				maxRotation: 90,
				minRotation: 0,
			},
		},
		impressions: {
			type: 'linear',
			position: 'left',
			grid: {
				display: false,
			},
			title: {
				display: true,
				text: `${t('campaigns.analytics.fields.impressions')},  ${t('campaigns.analytics.fields.clicks')}, ${t('campaigns.analytics.fields.botClicks')}`,
			},
		},
		clicks: {
			type: 'linear',
			position: 'left',
			display: false,
			grid: {
				display: false,
			},
			ticks: {
				display: false,
			},
		},
		botClicks: {
			type: 'linear',
			position: 'left',
			display: false,
			grid: {
				display: false,
			},
			ticks: {
				display: false,
			},
		},
		ctr: {
			type: 'linear',
			position: 'right',
			grid: {
				display: false,
			},
			title: {
				display: true,
				text: t('campaigns.analytics.fields.ctr'),
			},
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
			},
		},
	},
}))

const baseSet = {
	categoryPercentage: 1.0,
	barPercentage: 0.99,
	yAxisID: 'impressions',
}

const chartData = computed(() => {
	const data: ChartData<any> = {
		labels: analyticsStore.data.map(item => getFormattedDate(item.date)),
		datasets: [
			{
				label: t('campaigns.analytics.fields.ctr'),
				data: analyticsStore.data.map(item => item.ctr),
				backgroundColor: '#FFCE0A',
				borderColor: '#FFCE0A',
				type: 'line',
				tension: 0.4,
				yAxisID: 'ctr',
			},
			{
				...baseSet,
				label: t('campaigns.analytics.fields.clicks'),
				data: analyticsStore.data.map(item => item.clicks),
				backgroundColor: '#34CF52',
			},
			{
				...baseSet,
				label: t('campaigns.analytics.fields.botClicks'),
				data: analyticsStore.data.map(item => item.botClicks),
				backgroundColor: '#F23D3D',
			},
			{
				...baseSet,
				label: t('campaigns.analytics.fields.impressions'),
				data: analyticsStore.data.map(item => item.impressions),
				backgroundColor: '#266FFE',
			},
		],
	}
	return data
})

const savedMonth = ref<string | null>(null)

watch(analyticsStore.data, () => {
	savedMonth.value = null
})

const getFormattedDate = (date: string) => {
	const total = analyticsStore.data.length
	let showMonth = false

	const mDate = moment(date)
	const month = mDate.format('MMM')
	const day = mDate.format('D')

	if (!savedMonth.value || savedMonth.value !== month) {
		savedMonth.value = month
		showMonth = true
	}
	if (showMonth && total > 60) {
		return `${month} ${day}`
	}
	else if (showMonth) {
		return [day, month]
	}
	else {
		return day
	}
}
</script>
