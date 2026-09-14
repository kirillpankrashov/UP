<template>
  <div
    id="campaigns-analytics-date-picker"
    data-name="campaigns-analytics-date-picker"
    class="max-w-xs"
  >
    <ElDatePicker
      v-model="analyticsStore.currentDates"
      type="daterange"
      range-separator="–"
      format="DD.MM.YYYY"
      :picker-options="pickerOptions"
      :clearable="false"
      @change="analyticsStore.fetchData()"
      size="large"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { ElDatePicker } from '@/components/element-plus'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'

const analyticsStore = useCampaignAnalyticsStore()

const pickerOptions = computed(() => ({
	disabledDate: (date: Date) => {
		return date < analyticsStore.campaignDates[0] || date > analyticsStore.campaignDates[1]
	},
}))
</script>

<style lang="scss" scoped>
:deep(.el-range__icon) {
  order: 5;
  margin-left: auto;
}

:deep(.el-range-separator) {
  line-height: 40px;
}

:deep(.el-range-input) {
  width: 30%;
}
</style>
