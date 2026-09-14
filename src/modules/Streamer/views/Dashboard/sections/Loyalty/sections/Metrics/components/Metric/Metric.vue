<template>
  <div
    v-if="tierHasProperty"
    :class="{'item-success group': success}"
  >
    <div class="_text-s-regular">
      {{ label }}
    </div>
    <div
      v-if="!$slots.default"
      class="_headline-2 mt-[6px] block !text-[18px] !font-normal group-[.item-success]:text-success sm:mt-[8px] sm:!text-[24px]"
    >
      {{ value }}
    </div>
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Platform } from '@/core/types'
import type { TTier } from '@/modules/Streamer/views/Dashboard/api'
import { useDashboardStore } from '@/modules/Streamer/views/Dashboard/store'
import { useSettingsStore } from '@/modules/Streamer/views/Settings/store'

const props = defineProps<{
	name: keyof Exclude<TTier, null>['current']
	success: boolean
	label: string
	value: string
}>()

const dashboardStore = useDashboardStore()
const settingsStore = useSettingsStore()

const levels = computed(() => dashboardStore.tier?.data?.levels || [])
const current = computed(() => dashboardStore.tier?.data?.current)
const selectedLevel = computed(() => dashboardStore.tier?.selectedLevel || 1)
const platform = computed(() => settingsStore.widget?.platform)

const tierHasProperty = computed(() => {
	if (!current.value) return false

	if (props.name === 'extension' && platform.value !== Platform.TWITCH) {
		return false
	}

	const level = levels.value?.find(level => level?.level === selectedLevel?.value)
	return current.value.hasOwnProperty(props.name) && level?.requirements.hasOwnProperty(props.name)
})

defineExpose({
	tierHasProperty,
})
</script>
