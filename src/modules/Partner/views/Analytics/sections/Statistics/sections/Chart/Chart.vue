<template>
  <div
    data-name="partner-analytics-chart"
    class="mt-8"
  >
    <div class="mb-3 text-xs font-normal leading-3">
      {{ t('analytics.overviewTab.performanceTitle') }}
    </div>

    <div class="-ml-5 max-h-[520px] w-screen bg-primary-50 p-6 sm:mx-auto sm:w-auto sm:p-3">
      <Bar
        :options="chartOptions"
        :data="chartData"
        :width="400"
        :height="400"
      />
    </div>
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
import { messages } from '@/modules/Partner/views/Analytics/locales'
import { useStatisticsStore } from '@/modules/Partner/views/Analytics/store'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, LineController, PointElement)

const { t } = useLocale<typeof messages>(messages)

const statisticsStore = useStatisticsStore()

const chartOptions = computed<ChartOptions<'bar'>>(() => ({
	responsive: true,
	maintainAspectRatio: false,
	options: {
		responsive: true,
		maintainAspectRatio: true,
	},
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
				text: `${t('analytics.impressions')}, ${t('analytics.clicks')}`,
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
		ctr: {
			type: 'linear',
			position: 'right',
			grid: {
				display: false,
			},
			title: {
				display: true,
				text: t('analytics.CTR'),
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
	},
}))

const savedMonth = ref<string | null>(null)

const rawData = computed(() => statisticsStore.data?.data || [])

const data = computed(() => {
	const result = []
	for (const item of rawData.value) {
		if (new Date(item.date) <= new Date()) {
			result.push(item)
		}
	}
	return result
})

const chartData = computed<ChartData<any>>(() => ({
	labels: data.value.map(item => getFormattedDate(item.date)),
	datasets: [
		{
			label: t('analytics.CTR'),
			data: data.value.map(item => item.ctr),
			backgroundColor: '#FFCE0A',
			borderColor: '#FFCE0A',
			type: 'line',
			tension: 0.4,
			yAxisID: 'ctr',
		},
		{
			label: t('analytics.clicks'),
			data: data.value.map(item => item.clicks),
			categoryPercentage: 1.0,
			barPercentage: 0.99,
			backgroundColor: '#34CF52',
			yAxisID: 'impressions',
		},
		{
			label: t('analytics.impressions'),
			data: data.value.map(item => item.impressions),
			categoryPercentage: 1.0,
			barPercentage: 0.99,
			backgroundColor: '#266FFE',
			yAxisID: 'impressions',
		},
	],
}))

watch(data, () => {
	savedMonth.value = null
})

const getFormattedDate = (date: string) => {
	const total = data.value.length
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
