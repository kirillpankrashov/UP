<template>
  <div
    data-test="campaigns-report-btn"
    class="inline-block cursor-pointer"
    :class="{'sm:ml-3': isSmall}"
    @click.stop="onClick"
  >
    <div class="relative flex gap-1">
      <span
        class="text-primary"
        :class="{
          '_text-caption text-gray': isSmall,
          '_text-m-regular': !isSmall
        }"
      >{{ btnText }}</span>
      <component
        :is="noData || isFetching ? RefreshIcon : ArrowIcon"
        class="transition"
        :class="{
          'h-2 w-2 fill-gray': isSmall,
          'h-3 w-3 fill-primary': !isSmall,
          'animate-spin': isFetching
        }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useLocale } from '@/core/hooks'
import { messages } from '@/modules/Streamer/views/Campaigns/locales'
import { useCampaignAnalyticsStore } from '@/modules/Streamer/views/Campaigns/store'
import type { IActiveAdset, IActiveAdsetInfo } from '@/modules/Streamer/views/Campaigns/types'

import ArrowIcon from '@/assets/img/icons/link-arrow.svg'
import RefreshIcon from '@/assets/img/icons/refresh.svg'

const props = defineProps<{
  isSmall?: boolean
  adset: IActiveAdset | IActiveAdsetInfo
}>()

const { t } = useLocale<typeof messages>(messages)

const analyticsStore = useCampaignAnalyticsStore()

const isFetching = computed(() => analyticsStore.currentAdset?.slug === props.adset.slug && analyticsStore.isFetchingData)

const label = computed(() => props.isSmall ? t('campaigns.analytics.reportBtn.shortTitle') : t('campaigns.analytics.reportBtn.title'))

const btnText = ref(label.value)
const noData = ref(false)

const onClick = async () => {
	if (analyticsStore.isFetchingData) {
		return
	}

	btnText.value = t('campaigns.analytics.reportBtn.loading')
	await analyticsStore.showAnalytics(props.adset as IActiveAdset)

	if (!analyticsStore.data.length) {
		btnText.value = t('campaigns.analytics.reportBtn.noData')
		noData.value = true
		setTimeout(() => {
			btnText.value = label.value
			noData.value = false
		}, 3000)
	}
	else {
		btnText.value = label.value
	}
}
</script>
