<template>
  <div
    data-name="partner-analytics-categories"
    v-loading="categoriesStore.impressions.loading && categoriesStore.distribution.loading"
  >
    <h2 class="_headline-2 mb-6">
      {{ t('analytics.categoriesTab.title') }}
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
          @click="categoriesStore.downloadReport({ start: formattedDates.start, end: formattedDates.end })"
          class="min-w-[160px]"
        >
          <span class="_text-m-bold">{{ t('analytics.downloadCSV') }}</span>
        </ElButton>
      </div>
    </div>

    <LineStatistic
      class="mb-8"
      :dates="formattedDates"
    />

    <CategoriesTable :dates="formattedDates" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'

import { useLocale } from '@/core/hooks'
import { ElButton, ElDatePicker } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Analytics/locales'
import { useCategoriesStore } from '@/modules/Partner/views/Analytics/store'

import { CategoriesTable, LineStatistic } from './sections'

const { t } = useLocale<typeof messages>(messages)

const route = useRoute()
const router = useRouter()
const categoriesStore = useCategoriesStore()

const dates = ref()

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
		categoriesStore.fetchCategoriesImpressions({
			start: value.start,
			end: value.end,
			page: 1,
		})

		categoriesStore.fetchCategoriesDistribution({
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
