<template>
  <div
    data-name="partner-analytics-statistics"
    v-loading="statisticsStore.isFetching"
  >
    <div class="mb-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="w-full sm:max-w-[350px]">
        <ElDatePicker
          v-model="dates"
          type="daterange"
          size="large"
          :start-placeholder="t('analytics.overviewTab.startDate')"
          :end-placeholder="t('analytics.overviewTab.endDate')"
          range-separator="–"
          format="DD.MM.YYYY"
          :picker-options="pickerOptions"
        />
      </div>

      <div class="flex flex-col gap-3 sm:flex-row">
        <ElButton
          type="primary"
          plain
          size="large"
          @click="statisticsStore.downloadReport({ start: formattedDates.start, end: formattedDates.end, docType: 'xls' })"
          class="min-w-[160px]"
        >
          <span class="_text-m-bold">{{ t('analytics.downloadExcel') }}</span>
        </ElButton>

        <ElButton
          type="primary"
          plain
          size="large"
          @click="statisticsStore.downloadReport({ start: formattedDates.start, end: formattedDates.end })"
          class="min-w-[160px]"
        >
          <span class="_text-m-bold">{{ t('analytics.downloadCSV') }}</span>
        </ElButton>
      </div>
    </div>

    <div class="mb-8">
      <Common />
    </div>

    <Chart v-if="statisticsStore.data" />

    <div class=" my-8 border-t border-lightest-gray" />

    <Creatives id="creatives" />

    <div class=" my-8 border-t border-lightest-gray" />

    <Tops />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'

import { useLocale } from '@/core/hooks'
import { ElButton, ElDatePicker } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Analytics/locales'
import { useStatisticsStore } from '@/modules/Partner/views/Analytics/store'

import { Chart, Common, Creatives, Tops } from './sections'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()
const router = useRouter()
const statisticsStore = useStatisticsStore()

const dates = ref()

const campaigns = computed(() => statisticsStore.data || {
	dates: { start: '', end: '' },
	impressions: { current: 0, limit: 0 },
	spent: { current: 0, limit: 0 },
})

const currentDateInPicker = computed(() => {
	const lastDay = moment(campaigns.value.dates?.end)
	if (moment().diff(lastDay, 'days') <= 0) {
		return moment().subtract(1, 'days').toDate()
	}
	return new Date()
})

const pickerOptions = computed(() => ({
	disabledDate: (date: Date) => {
		return date > currentDateInPicker.value || date < new Date(campaigns.value.dates?.start || new Date())
	},
}))

// const pickerOptions = computed(() => ({
// 	disabledDate: (date: Date) => {
// 		return date < campaigns.value.dates?.start || date > campaigns.value.dates?.end
// 	},
// }))

const formattedDates = computed(() => {
	if (!dates.value || !Array.isArray(dates.value) || dates.value.length < 2) {
		return { start: '', end: '' }
	}

	return {
		start: moment(dates.value[0]).format('YYYY-MM-DD'),
		end: moment(dates.value[1]).format('YYYY-MM-DD'),
	}
})

watch(formattedDates, (value, oldValue) => {
	if (value.start && value.end && oldValue.start !== 'Invalid date') {
		statisticsStore.fetchCampaignStatistics({
			start: value.start,
			end: value.end,
		})

		router.replace({
			query: {
				...route.query,
				start: value.start,
				end: value.end,
			},
		})
	}
}, { deep: true })

onMounted(() => {
	const dateStart = new Date(route.query?.start as string)
	const dateEnd = new Date(route.query?.end as string)

	if (!isNaN(dateStart.getTime()) && !isNaN(dateEnd.getTime())) {
		dates.value = [dateStart, dateEnd]
	}
})
</script>
