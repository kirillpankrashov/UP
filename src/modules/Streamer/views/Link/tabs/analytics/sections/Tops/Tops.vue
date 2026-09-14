<template>
  <DashboardSection
    id="link-analytics-tops"
    data-name="streamer-link-analytics-tops"
    :no-left="true"
    :no-border="true"
    :collapsable="false"
    v-loading="analyticsStore.topsLoading || analyticsStore.topPeriodLoading"
  >
    <div class="mb-6">
      <div class="mb-3 flex flex-wrap justify-between sm:justify-start sm:gap-3">
        <button
          v-for="btn in buttons"
          :key="btn.tab"
          :data-test="`link-analytics-tops-list-${btn.tab}-btn`"
          class="_text-m-regular cursor-pointer bg-transparent"
          :class="{'text-primary': analyticsStore.currentList === btn.tab}"
          @click="setCurrentList(btn.tab)"
        >
          {{ btn.label }}
        </button>
      </div>

      <div class="w-full sm:max-w-[280px]">
        <ElDatePicker
          v-model="analyticsStore.topPeriod.date"
          type="daterange"
          size="large"
          format="DD.MM.YYYY"
          :start-placeholder="t('link.supporters.history.targets.startDate')"
          :end-placeholder="t('link.supporters.history.targets.endDate')"
          :picker-options="pickerOptions"
          :clearable="false"
          @change="onDateChange"
        />
      </div>
    </div>

    <div
      v-if="topList.length"
      data-test="link-analytics-tops-list-table"
      class="grid gap-y-2"
    >
      <ElTable
        :data="topList"
        style="width: 100%"
      >
        <ElTableColumn
          :label="t('link.supporters.history.columns.id')"
          :width="40"
        >
          <template #default="{ row: { id } }">
            {{ getNumber(id) }}
          </template>
        </ElTableColumn>
        <ElTableColumn
          :label="t('link.supporters.history.columns.name')"
          prop="name"
        />
        <ElTableColumn
          :label="t('link.supporters.history.columns.contribution')"
          prop="points"
        />
      </ElTable>
    </div>

    <div
      v-else
      class="text-center text-gray"
    >
      <div class="text-m-bold">
        {{ t('link.supporters.history.noSupportersTitle') }}
      </div>
    </div>
  </DashboardSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/core/hooks'
import { ElDatePicker,ElTable, ElTableColumn } from '@/components/element-plus'
import { DashboardSection } from '@/components/layouts'
import { messages } from '@/modules/Streamer/views/Link/locales'
import { TopList, useLinkAnalyticsStore } from '@/modules/Streamer/views/Link/store'

const { t } = useLocale<typeof messages>(messages)

const analyticsStore = useLinkAnalyticsStore()

const topList = computed(() => analyticsStore.topList)

const buttons = [
	{
		tab: TopList.TODAY,
		label: t('link.supporters.history.targets.today'),
	},
	{
		tab: TopList.YESTERDAY,
		label: t('link.supporters.history.targets.yesterday'),
	},
	{
		tab: TopList.WEEK,
		label: t('link.supporters.history.targets.week'),
	},
	{
		tab: TopList.MONTH,
		label: t('link.supporters.history.targets.month'),
	},
	{
		tab: TopList.ALLTIME,
		label: t('link.supporters.history.targets.allTime'),
	},
]

const getNumber = (id: number) => {
	const idx = topList.value?.findIndex(suppoorter => suppoorter.id === id)

	if (typeof idx === 'number') {
		return idx + 1
	}

	return null
}

const setCurrentList = (list: TopList) => {
	analyticsStore.currentList = list
	analyticsStore.topPeriod.date = ['', '']
}


const today = new Date()

const get30DaysAgo = () => {
	today.setDate(today.getDate() - 30)
	return today
}

const pickerOptions = {
	disabledDate (time: Date) {
		const thirtyDaysAgo = get30DaysAgo()
		return time.getTime() > today.getTime() || time.getTime() < thirtyDaysAgo.getTime()
	},
}

const onDateChange = () => {
	analyticsStore.fetchPeriod()
	analyticsStore.currentList = TopList.PERIOD
}
</script>
