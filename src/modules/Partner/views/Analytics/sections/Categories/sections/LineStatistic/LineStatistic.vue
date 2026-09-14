<template>
  <div data-name="partner-analytics-categories-line-statistic">
    <div class="_text-l-bold mb-4">
      {{ t('analytics.categories') }}
    </div>
    <div class="mb-4 flex">
      <div
        v-for="item in categories"
        :key="item.id"
        class="mr-0.5 h-12 rounded"
        :style="`width: calc(${item.percent}% - 2px); background-color: ${item.color};`"
      />
    </div>

    <div class="grid grid-cols-3 gap-2 sm:flex">
      <div
        v-for="item in categories"
        :key="item.id"
        class="relative grow"
      >
        <div
          class="absolute left-0 top-2 h-2 w-2 rounded-full"
          :style="`background-color: ${item.color}`"
        />
        <div class="pl-4">
          <div class="_headline-2 mb-2">
            {{ item.percent }}%
          </div>
          <div class="_text-caption">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'

import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Partner/views/Analytics/locales'
import { useCategoriesStore } from '@/modules/Partner/views/Analytics/store'

const props = defineProps<{
	dates: {
		start: string
		end: string
	}
}>()

const { t } = useLocale<typeof messages>(messages)
const categoriesStore = useCategoriesStore()

const colors = ['#266FFE', '#13BF34', '#F23D3D', '#FFCE0A', '#8723EE', '#22CAFF', '#CCCCCC']

const categories = computed(() => {
	const distributionData = categoriesStore.distribution.data
	if (!distributionData) return []

	return distributionData.map((item: any, index: number) => {
		return {
			...item,
			id: index + 1,
			color: colors[index],
		}
	})
})

watch(() => props.dates, () => {
	fetchData()
})

const fetchData = () => {
	if (props.dates.start && props.dates.end) {
		categoriesStore.fetchCategoriesDistribution({
			start: props.dates.start,
			end: props.dates.end,
		})
	}
}

onMounted(() => {
	if (props.dates.start && props.dates.start !== 'Invalid date') {
		fetchData()
	}
})
</script>
