<template>
  <div
    data-name="partner-analytics-streamers"
    v-loading="streamersStore.isFetching"
  >
    <h2 class="_headline-2 mb-6">
      {{ t('analytics.creatorsTab.title') }}
    </h2>

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
          @click="streamersStore.downloadReport({ start: formattedDates.start, end: formattedDates.end })"
          class="min-w-[160px]"
        >
          <span class="_text-m-bold">{{ t('analytics.downloadCSV') }}</span>
        </ElButton>
      </div>
    </div>

    <StreamersTable
      v-if="streamersStore.data?.length"
      :filters="filters"
      @update:filters="filters = $event"
    />

    <div
      v-else-if="!streamersStore.isFetching"
      class="flex h-[200px] items-center justify-center p-6 text-center"
    >
      <span class="_text-l-regular">{{ t('other.noData') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'

import { useLocale } from '@/core/hooks'
import { ElButton, ElDatePicker } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Analytics/locales'
import { useStreamersStore } from '@/modules/Partner/views/Analytics/store'

import { StreamersTable } from './sections'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()
const router = useRouter()
const streamersStore = useStreamersStore()

const dates = ref()

const filters = ref({
	page: 1,
	sortDirection: 'desc' as const,
	sortBy: 'impressions',
})

const currentDateInPicker = computed(() => {
	const lastDay = moment(formattedDates.value.end)
	if (moment().diff(lastDay, 'days') <= 0) {
		return moment().subtract(1, 'days').toDate()
	}
	return new Date()
})

const pickerOptions = computed(() => ({
	disabledDate: (date: Date) => {
		return date > currentDateInPicker.value
	},
}))

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
		streamersStore.fetchStreamers({
			start: value.start,
			end: value.end,
			page: filters.value.page,
			sortBy: filters.value.sortBy,
			sortDirection: filters.value.sortDirection,
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

watch(filters, () => {
	if (formattedDates.value.start && formattedDates.value.end) {
		streamersStore.fetchStreamers({
			start: formattedDates.value.start,
			end: formattedDates.value.end,
			page: filters.value.page,
			sortBy: filters.value.sortBy,
			sortDirection: filters.value.sortDirection,
		})
	}
})

onMounted(() => {
	const dateStart = new Date(route.query?.start as string)
	const dateEnd = new Date(route.query?.end as string)

	if (!isNaN(dateStart.getTime()) && !isNaN(dateEnd.getTime())) {
		dates.value = [dateStart, dateEnd]
	}
})
</script>
