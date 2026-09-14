<template>
  <div
    data-name="analytics-top-list"
    class="mt-8 flex w-full"
  >
    <div class="flex shrink-0">
      <div class="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
        {{ index }}
      </div>
      <div
        class="flex items-center justify-center bg-cover bg-center bg-no-repeat"
        :class="{
          'h-16 w-16 rounded-full': !isCategory,
          'ml-2 h-16 w-12 rounded': isCategory
        }"
        :style="placeholderImg"
      >
        <div
          class="bg-cover bg-center bg-no-repeat"
          :class="{
            'h-16 w-16 rounded-full': !isCategory,
            'h-16 w-12 rounded': isCategory
          }"
          :style="bgImg"
        />
      </div>
    </div>

    <div class="ml-2 w-full">
      <div class="_text-m-bold mb-3">
        {{ name }}
      </div>

      <div class="grid grid-cols-3 gap-2">
        <div v-if="impressions">
          <div class="_text-caption mb-1">
            {{ t('analytics.impressions') }}
          </div>
          <div class="_text-s-regular">
            {{ formatNumber(impressions, false) }}
          </div>
        </div>

        <div v-if="clicks">
          <div class="_text-caption mb-1">
            {{ t('analytics.clicks') }}
          </div>
          <div class="_text-s-regular">
            {{ formatNumber(clicks, false) }}
          </div>
        </div>

        <div v-if="ctr">
          <div class="_text-caption mb-1">
            {{ t('analytics.CTR') }}
          </div>
          <div class="_text-s-regular">
            {{ ctr }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useCurrency, useLocale } from '@/core/hooks'
import { messages } from '@/modules/Partner/views/Analytics/locales'

import categoryPlaceholder from '@/assets/img/category-placeholder.png'
import userPlaceholder from '@/assets/img/user-placeholder.png'

interface Props {
	isCategory: boolean
	index: number
	image: string
	name: string
	impressions: number
	clicks: number
	ctr: number
}

const props = defineProps<Props>()

const { t } = useLocale<typeof messages>(messages)
const { formatNumber } = useCurrency()

const placeholderImg = computed(() => {
	const placeholder = props.isCategory ? categoryPlaceholder : userPlaceholder
	return `background-image: url(${placeholder})`
})

const bgImg = computed(() => `background-image: url('${props.image}')`)
</script>
