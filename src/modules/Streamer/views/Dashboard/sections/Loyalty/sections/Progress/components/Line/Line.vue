<template>
  <div class="relative mx-2 shrink-0 sm:mx-0">
    <svg
      width="74"
      height="4"
      viewBox="0 0 80 4"
    >
      <path
        class="stroke-[#ccc]"
        stroke-width="4"
        stroke-dasharray="0.1 8"
        stroke-linecap="round"
        d="M2 2h76"
      />
    </svg>
    <div
      class="absolute left-0 top-0 w-0 overflow-hidden"
      :style="`width: ${progressPerLevel}%`"
    >
      <svg
        width="74"
        height="4"
        viewBox="0 0 80 4"
      >
        <path
          class="stroke-success"
          stroke-width="4"
          stroke-dasharray="0.1 8"
          stroke-linecap="round"
          d="M2 2h76"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { type TTier } from '@/modules/Streamer/views/Dashboard/api'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'

const props = defineProps<{
	level: number
}>()

const dashboardStore = useDashboardStore()

const current = computed(() => dashboardStore.tier.data?.current)
const currentLevel = computed(() => current.value?.level || 0)
const levels = computed(() => dashboardStore.tier.data?.levels)

const currentLevelProgress = computed(() => {
	const requirements = levels.value?.find(level => level.level === currentLevel.value + 1)?.requirements

	if (!requirements || !current.value) return

	const sectionSize = 100 / Object.keys(requirements).length
	let progress = 0

	Object.keys(requirements).forEach((key) => {
		if (!current.value) {
			return
		}
		const requiredVal = requirements[key as keyof typeof requirements]
		const currentVal = current.value[key as keyof Exclude<TTier, null>['current']]

		if (typeof requiredVal === 'number' && typeof currentVal !== 'number') {
			if (
				'value' in currentVal &&
				typeof currentVal.value === 'number' &&
				currentVal.value >= requiredVal
			) {
				progress += sectionSize
			}
		}
		if (typeof requiredVal === 'boolean') {
			if (currentVal) {
				progress += sectionSize
			}
		}
	})

	return progress
})

const progressPerLevel = computed(() => {
	if (!currentLevelProgress.value) {
		return 0
	}

	if (props.level === currentLevel.value) {
		return Math.floor(currentLevelProgress.value)
	}

	if (props.level < currentLevel.value) {
		return 100
	}

	return 0
})

defineExpose({
	progressPerLevel,
})
</script>
