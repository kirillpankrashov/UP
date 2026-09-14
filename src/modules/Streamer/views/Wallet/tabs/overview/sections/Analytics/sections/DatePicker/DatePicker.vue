<template>
  <div class="w-full sm:max-w-[220px]">
    <ElDatePicker
      v-if="!analyticsStore.isFetchingData"
      v-model="analyticsStore.month"
      size="large"
      type="month"
      format="MMMM YYYY"
      :picker-options="pickerOptions"
      :clearable="false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { ElDatePicker } from '@/components/element-plus'
import { useStreamerStore } from '@/modules/Streamer/views/Profile/store'
import { useWalletAnalyticsStore } from '@/modules/Streamer/views/Wallet/store'

const streamerStore = useStreamerStore()
const analyticsStore = useWalletAnalyticsStore()

const userSignedUp = computed(() => {
	if (streamerStore.profile) {
		return new Date(streamerStore.profile.signedUp)
	}

	return new Date()
})

const currentDate = new Date()
const currentYear = currentDate.getFullYear()
const currentMonth = currentDate.getMonth()

const pickerOptions = computed(() => ({
	disabledDate: (date: Date) => {
		const year = date.getFullYear()
		const month = date.getMonth()

		if (year <= currentYear && year >= userSignedUp.value.getFullYear()) {
			if (year === userSignedUp.value.getFullYear() && month < userSignedUp.value.getMonth()) {
				return true
			}
			if (year === currentYear && month > currentMonth) {
				return true
			}
			return false
		}

		return true
	},
}))

defineExpose({
	pickerOptions,
})
</script>
