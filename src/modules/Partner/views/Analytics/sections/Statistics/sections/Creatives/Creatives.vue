<template>
  <div data-name="partner-analytics-creatives">
    <div class="mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
      <h2 class="_text-l-bold mb-6 sm:mb-0">
        {{ t('analytics.overviewTab.creativeStats') }}
      </h2>

      <div class="w-full sm:max-w-[320px]">
        <ElSelect
          v-model="selectedCategory"
          class="max-w-80 w-full sm:w-auto"
          placeholder="Select"
          size="large"
          placement="top-end"
          popper-class="creative-stats-popper"
        >
          <ElOption
            :label="t('analytics.overviewTab.allCategories')"
            value=""
          />
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </div>
    </div>

    <ElTable
      :data="filteredData"
      :default-sort="{ prop: 'ctr', order: 'descending' }"
      class="w-full"
      show-overflow-tooltip
      tooltip-effect="light"
    >
      <ElTableColumn
        :label="t('analytics.overviewTab.groupName')"
        prop="adsetName"
      />
      <ElTableColumn
        :label="t('analytics.overviewTab.creativeName')"
        prop="creativeName"
      />
      <ElTableColumn
        :label="t('analytics.adFormat')"
        prop="format"
      />
      <ElTableColumn
        :label="t('analytics.impressions')"
        prop="impressions"
        sortable
        width="120"
        :formatter="(_row, _column, cellValue, _index) => {
          return formatNumber(cellValue, false)
        }"
      />
      <ElTableColumn
        :label="t('analytics.reach')"
        prop="reach"
        sortable
        width="120"
        :formatter="(_row, _column, cellValue, _index) => {
          return formatNumber(cellValue, false)
        }"
      />
      <ElTableColumn
        :label="t('analytics.clicks')"
        prop="clicks"
        sortable
        width="120"
        :formatter="(_row, _column, cellValue, _index) => {
          return formatNumber(cellValue, false)
        }"
      />
      <ElTableColumn
        :label="t('analytics.CTR')"
        prop="ctr"
        sortable
        width="120"
        :formatter="(_row, _column, cellValue, _index) => {
          return +cellValue.toFixed(2) + '%'
        }"
      />
      <ElTableColumn
        :label="t('analytics.spent')"
        prop="spent"
        sortable
        width="120"
        :formatter="(_row, _column, cellValue, _index) => {
          return formatNumber(+cellValue, false)
        }"
      />
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useCurrency,useLocale } from '@/core/hooks'
import { ElOption, ElSelect, ElTable, ElTableColumn } from '@/components/element-plus'
import { messages } from '@/modules/Partner/views/Analytics/locales'
import { useStatisticsStore } from '@/modules/Partner/views/Analytics/store'

const { t } = useLocale<typeof messages>(messages)

const { formatNumber } = useCurrency()

const statisticsStore = useStatisticsStore()

const selectedCategory = ref('')

const data = computed(() => statisticsStore.data?.creatives || [])

const filteredData = computed(() => {
	if (!selectedCategory.value) return data.value

	return data.value.filter((item) =>
		item.adsetName === selectedCategory.value,
	)
})

const options = computed(() => {
	if (!data.value) return []

	const uniqueCategories = [...new Set(data.value.map((item) => item.adsetName))]

	return uniqueCategories.map((category: string) => ({
		value: category,
		label: category,
	}))
})
</script>

<style>
.creative-stats-popper {
	max-width: calc(100vw - 40px);
}
</style>
